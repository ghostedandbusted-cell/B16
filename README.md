# Contact Scraper

A powerful, rule-based contact scraper with customizable workflows for extracting contact information from websites.

## Features

### 🎯 Core Capabilities
- **Sitemap & Start Point Configuration**: Define starting URLs and crawling behavior
- **Customizable Scraping Rules**: Create step-by-step extraction workflows
- **Multiple Extraction Methods**: Regex patterns, CSS selectors, XPath expressions, and custom JavaScript
- **JavaScript Rendering**: Handle dynamic content with Puppeteer
- **Conditional Scraping**: Smart fallback rules and conditional logic
- **Data Deduplication**: Automatic cleaning and deduplication of extracted data

### 🛠️ Rule Types
- **Regex Patterns**: Extract emails, phone numbers, addresses, and custom patterns
- **CSS Selectors**: Target specific HTML elements
- **XPath Expressions**: Advanced element selection
- **Custom Scripts**: JavaScript code for complex extractions

### 📊 User Interface
- **Drag-and-Drop Rule Builder**: Intuitive rule creation and ordering
- **Real-time Preview**: See rule results as you build
- **Template System**: Save and reuse rule sets
- **Results Dashboard**: Comprehensive data visualization
- **Export Options**: CSV, JSON, and Excel formats

### 🚀 Advanced Features
- **Sitemap Crawling**: Follow links and crawl multiple pages
- **Template Management**: Import/export rule configurations
- **Progress Tracking**: Real-time scraping status
- **Error Handling**: Robust error management and reporting
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd /workspace
npm install
```

2. **Install server dependencies:**
```bash
cd server
npm install
```

3. **Install client dependencies:**
```bash
cd ../client
npm install
```

### Running the Application

1. **Start both frontend and backend:**
```bash
cd /workspace
npm run dev
```

2. **Or run separately:**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage Guide

### 1. Creating Rules

Navigate to the **Rule Builder** page to create your extraction rules:

- **Email Extraction**: Use regex pattern `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- **Phone Numbers**: Use regex pattern `(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})`
- **Social Media Links**: Use regex pattern `(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|twitter\.com|linkedin\.com|instagram\.com)\/[a-zA-Z0-9._-]+`
- **Addresses**: Use regex pattern `(\d+\s+[A-Za-z0-9\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Place|Pl|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Route|Rt|North|N|South|S|East|E|West|W|Northeast|NE|Northwest|NW|Southeast|SE|Southwest|SW))`

### 2. Running Scrapes

Use the **Scraper** page to configure and run your scraping jobs:

1. Enter the target URL
2. Select which rules to apply
3. Choose between single page or crawling mode
4. Set maximum pages for crawling
5. Click "Start Scraping"

### 3. Viewing Results

The **Results** page shows all your scraping data:

- Filter by status, date, or search terms
- Expand rows to see detailed extraction data
- Export results in CSV or JSON format
- View statistics and success rates

### 4. Managing Templates

The **Templates** page allows you to:

- Save current rules as reusable templates
- Load preset templates for common use cases
- Import/export template files
- Share configurations with team members

## API Endpoints

### Rules Management
- `GET /api/rules` - Get all rules
- `POST /api/rules` - Create new rule
- `PUT /api/rules/:id` - Update rule
- `DELETE /api/rules/:id` - Delete rule

### Scraping
- `POST /api/scrape` - Run scraping job
- `GET /api/results` - Get scraping results

### Export
- `GET /api/export/csv` - Export results as CSV
- `GET /api/export/json` - Export results as JSON

## Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
```

### Browser Configuration
The scraper uses Puppeteer with the following default settings:
- Headless mode enabled
- Viewport: 1920x1080
- User agent: Chrome 91
- Timeout: 30 seconds

## Troubleshooting

### Common Issues

1. **Puppeteer installation fails:**
   ```bash
   cd server
   npm install puppeteer --unsafe-perm=true --allow-root
   ```

2. **Port already in use:**
   - Change the PORT in server/.env
   - Or kill the process using the port

3. **CORS errors:**
   - Ensure the backend is running on port 5000
   - Check that the proxy is configured in client/package.json

4. **Memory issues with large crawls:**
   - Reduce maxPages in crawling configuration
   - Increase Node.js memory limit: `node --max-old-space-size=4096 server/index.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Create an issue in the repository