import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RuleBuilder from './pages/RuleBuilder';
import Scraper from './pages/Scraper';
import Results from './pages/Results';
import Templates from './pages/Templates';

const theme = {
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    secondary: '#f1f5f9',
    accent: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    text: '#1e293b',
    textLight: '#64748b',
    background: '#ffffff',
    backgroundSecondary: '#f8fafc',
    border: '#e2e8f0',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.backgroundSecondary};
    color: ${props => props.theme.colors.text};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 250px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
`;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rules, setRules] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRules();
    fetchResults();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('/api/rules');
      const data = await response.json();
      setRules(data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const addRule = async (rule) => {
    try {
      const response = await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rule),
      });
      const newRule = await response.json();
      setRules([...rules, newRule]);
      return newRule;
    } catch (error) {
      console.error('Error adding rule:', error);
      throw error;
    }
  };

  const updateRule = async (id, updatedRule) => {
    try {
      const response = await fetch(`/api/rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRule),
      });
      const updated = await response.json();
      setRules(rules.map(rule => rule.id === id ? updated : rule));
      return updated;
    } catch (error) {
      console.error('Error updating rule:', error);
      throw error;
    }
  };

  const deleteRule = async (id) => {
    try {
      await fetch(`/api/rules/${id}`, { method: 'DELETE' });
      setRules(rules.filter(rule => rule.id !== id));
    } catch (error) {
      console.error('Error deleting rule:', error);
      throw error;
    }
  };

  const runScraping = async (scrapingConfig) => {
    setLoading(true);
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scrapingConfig),
      });
      const data = await response.json();
      setResults(data);
      return data;
    } catch (error) {
      console.error('Error running scraping:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          <MainContent>
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <ContentArea>
              <Routes>
                <Route path="/" element={
                  <Dashboard 
                    rules={rules}
                    results={results}
                    onRunScraping={runScraping}
                    loading={loading}
                  />
                } />
                <Route path="/rules" element={
                  <RuleBuilder 
                    rules={rules}
                    onAddRule={addRule}
                    onUpdateRule={updateRule}
                    onDeleteRule={deleteRule}
                  />
                } />
                <Route path="/scraper" element={
                  <Scraper 
                    rules={rules}
                    onRunScraping={runScraping}
                    loading={loading}
                  />
                } />
                <Route path="/results" element={
                  <Results 
                    results={results}
                    onRefresh={fetchResults}
                  />
                } />
                <Route path="/templates" element={
                  <Templates 
                    rules={rules}
                    onLoadRules={setRules}
                  />
                } />
              </Routes>
            </ContentArea>
          </MainContent>
        </AppContainer>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;