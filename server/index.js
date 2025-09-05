const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory storage for rules and results
let rules = [];
let scrapingResults = [];

// Initialize browser instance
let browser = null;

const initBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }
  return browser;
};

// Scraping patterns
const patterns = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
  socialMedia: {
    facebook: /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi,
    twitter: /(?:https?:\/\/)?(?:www\.)?twitter\.com\/[a-zA-Z0-9._-]+/gi,
    linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+/gi,
    instagram: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9._-]+/gi
  },
  address: /(\d+\s+[A-Za-z0-9\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Place|Pl|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Route|Rt|North|N|South|S|East|E|West|W|Northeast|NE|Northwest|NW|Southeast|SE|Southwest|SW))/gi
};

// Scraping engine
class ScrapingEngine {
  constructor() {
    this.browser = null;
  }

  async init() {
    this.browser = await initBrowser();
  }

  async scrapePage(url, rules, options = {}) {
    const page = await this.browser.newPage();
    const results = {
      url,
      timestamp: new Date().toISOString(),
      data: {},
      status: 'success',
      error: null
    };

    try {
      // Set viewport and user agent
      await page.setViewport({ width: 1920, height: 1080 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

      // Navigate to page
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait for content to load
      await page.waitForTimeout(2000);

      // Get both rendered content and page source
      const [renderedContent, pageSource] = await Promise.all([
        page.content(),
        page.evaluate(() => document.documentElement.outerHTML)
      ]);

      // Process rules in order
      for (const rule of rules) {
        try {
          const ruleResult = await this.executeRule(rule, renderedContent, pageSource, page);
          results.data[rule.name] = ruleResult;
        } catch (error) {
          console.error(`Error executing rule ${rule.name}:`, error);
          results.data[rule.name] = { error: error.message };
        }
      }

    } catch (error) {
      results.status = 'error';
      results.error = error.message;
    } finally {
      await page.close();
    }

    return results;
  }

  async executeRule(rule, renderedContent, pageSource, page) {
    const result = {
      type: rule.type,
      pattern: rule.pattern,
      selector: rule.selector,
      matches: [],
      count: 0
    };

    try {
      switch (rule.type) {
        case 'regex':
          result.matches = this.extractWithRegex(rule.pattern, renderedContent + ' ' + pageSource);
          break;
        case 'css':
          result.matches = await this.extractWithCSS(rule.selector, page);
          break;
        case 'xpath':
          result.matches = await this.extractWithXPath(rule.selector, page);
          break;
        case 'custom':
          result.matches = await this.executeCustomScript(rule.script, page);
          break;
        default:
          throw new Error(`Unknown rule type: ${rule.type}`);
      }

      // Clean and deduplicate matches
      result.matches = this.cleanAndDeduplicate(result.matches);
      result.count = result.matches.length;

    } catch (error) {
      result.error = error.message;
    }

    return result;
  }

  extractWithRegex(pattern, content) {
    const regex = new RegExp(pattern, 'gi');
    const matches = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[0].trim());
    }
    
    return matches;
  }

  async extractWithCSS(selector, page) {
    return await page.$$eval(selector, elements => 
      elements.map(el => el.textContent?.trim() || el.getAttribute('href') || el.getAttribute('src') || '')
    );
  }

  async extractWithXPath(xpath, page) {
    const elements = await page.$x(xpath);
    const results = [];
    
    for (const element of elements) {
      const text = await page.evaluate(el => el.textContent?.trim() || el.getAttribute('href') || el.getAttribute('src') || '', element);
      results.push(text);
    }
    
    return results;
  }

  async executeCustomScript(script, page) {
    return await page.evaluate(script);
  }

  cleanAndDeduplicate(matches) {
    return [...new Set(matches.filter(match => match && match.length > 0))];
  }

  async crawlSitemap(sitemapUrl, rules, maxPages = 50) {
    const results = [];
    const visited = new Set();
    const queue = [sitemapUrl];

    while (queue.length > 0 && results.length < maxPages) {
      const url = queue.shift();
      
      if (visited.has(url)) continue;
      visited.add(url);

      console.log(`Scraping: ${url}`);
      const result = await this.scrapePage(url, rules);
      results.push(result);

      // Extract links for further crawling
      if (result.status === 'success') {
        const page = await this.browser.newPage();
        try {
          await page.goto(url, { waitUntil: 'networkidle2' });
          const links = await page.$$eval('a[href]', links => 
            links.map(link => link.href).filter(href => 
              href.startsWith('http') && 
              !href.includes('#') && 
              !href.includes('mailto:') && 
              !href.includes('tel:')
            )
          );
          
          // Add new links to queue
          links.slice(0, 10).forEach(link => {
            if (!visited.has(link) && queue.length < maxPages) {
              queue.push(link);
            }
          });
        } catch (error) {
          console.error(`Error extracting links from ${url}:`, error);
        } finally {
          await page.close();
        }
      }
    }

    return results;
  }
}

const scrapingEngine = new ScrapingEngine();

// API Routes

// Initialize scraping engine
app.post('/api/init', async (req, res) => {
  try {
    await scrapingEngine.init();
    res.json({ success: true, message: 'Scraping engine initialized' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rules management
app.get('/api/rules', (req, res) => {
  res.json(rules);
});

app.post('/api/rules', (req, res) => {
  const rule = { ...req.body, id: uuidv4() };
  rules.push(rule);
  res.json(rule);
});

app.put('/api/rules/:id', (req, res) => {
  const { id } = req.params;
  const index = rules.findIndex(rule => rule.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Rule not found' });
  }
  
  rules[index] = { ...rules[index], ...req.body };
  res.json(rules[index]);
});

app.delete('/api/rules/:id', (req, res) => {
  const { id } = req.params;
  rules = rules.filter(rule => rule.id !== id);
  res.json({ success: true });
});

// Scraping endpoints
app.post('/api/scrape', async (req, res) => {
  try {
    const { url, rules: scrapingRules, crawlMode = false, maxPages = 50 } = req.body;
    
    if (!scrapingRules || scrapingRules.length === 0) {
      return res.status(400).json({ error: 'No rules provided' });
    }

    let results;
    if (crawlMode) {
      results = await scrapingEngine.crawlSitemap(url, scrapingRules, maxPages);
    } else {
      results = [await scrapingEngine.scrapePage(url, scrapingRules)];
    }

    scrapingResults = results;
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/results', (req, res) => {
  res.json(scrapingResults);
});

// Export results
app.get('/api/export/csv', (req, res) => {
  const csv = convertToCSV(scrapingResults);
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=scraping-results.csv');
  res.send(csv);
});

app.get('/api/export/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=scraping-results.json');
  res.json(scrapingResults);
});

// Helper function to convert results to CSV
function convertToCSV(results) {
  if (results.length === 0) return '';
  
  const headers = ['URL', 'Timestamp', 'Status'];
  const dataRows = [];
  
  // Extract all unique data keys
  const allKeys = new Set();
  results.forEach(result => {
    Object.keys(result.data || {}).forEach(key => allKeys.add(key));
  });
  
  headers.push(...Array.from(allKeys));
  
  results.forEach(result => {
    const row = [result.url, result.timestamp, result.status];
    allKeys.forEach(key => {
      const data = result.data?.[key];
      if (data && data.matches) {
        row.push(data.matches.join('; '));
      } else {
        row.push('');
      }
    });
    dataRows.push(row);
  });
  
  return [headers, ...dataRows].map(row => 
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await scrapingEngine.init();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});