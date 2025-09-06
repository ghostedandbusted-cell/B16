import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Play, 
  Settings, 
  ExternalLink, 
  Globe, 
  FileText,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const ScraperContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
`;

const ScraperForm = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 3rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #6366f1;
`;

const CheckboxLabel = styled.label`
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
`;

const RulesPreview = styled.div`
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const RuleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const RuleIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 0.375rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const RuleName = styled.span`
  font-weight: 500;
  color: #1e293b;
`;

const RuleType = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  margin-left: auto;
`;

const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#6366f1' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#1e293b'};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : '#e2e8f0'};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#4f46e5' : '#f1f5f9'};
  }
  
  &:disabled {
    background: #64748b;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StatusCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatusIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const StatusTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const StatusDescription = styled.p`
  color: #64748b;
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 0.375rem;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #6366f1;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const ruleTypeColors = {
  regex: '#6366f1',
  css: '#10b981',
  xpath: '#f59e0b',
  custom: '#8b5cf6'
};

function Scraper({ rules, onRunScraping, loading }) {
  const [formData, setFormData] = useState({
    url: '',
    crawlMode: false,
    maxPages: 50,
    selectedRules: rules.map(rule => rule.id)
  });

  const [scrapingStatus, setScrapingStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRuleToggle = (ruleId) => {
    setFormData(prev => ({
      ...prev,
      selectedRules: prev.selectedRules.includes(ruleId)
        ? prev.selectedRules.filter(id => id !== ruleId)
        : [...prev.selectedRules, ruleId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    if (formData.selectedRules.length === 0) {
      toast.error('Please select at least one rule');
      return;
    }

    const selectedRulesData = rules.filter(rule => 
      formData.selectedRules.includes(rule.id)
    );

    setScrapingStatus({
      status: 'running',
      message: 'Starting scraping process...',
      progress: 0
    });

    try {
      const results = await onRunScraping({
        url: formData.url,
        rules: selectedRulesData,
        crawlMode: formData.crawlMode,
        maxPages: formData.maxPages
      });

      setScrapingStatus({
        status: 'completed',
        message: `Scraping completed! Found ${results.length} pages.`,
        progress: 100,
        results: results
      });

      toast.success('Scraping completed successfully!');
    } catch (error) {
      setScrapingStatus({
        status: 'error',
        message: `Scraping failed: ${error.message}`,
        progress: 0
      });
      toast.error('Scraping failed: ' + error.message);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return <Clock size={20} />;
      case 'completed':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return '#f59e0b';
      case 'completed':
        return '#10b981';
      case 'error':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  return (
    <ScraperContainer>
      <Header>
        <Title>Website Scraper</Title>
        <Subtitle>Configure and run your scraping jobs</Subtitle>
      </Header>

      <ScraperForm>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>
              <Globe size={20} />
              Target Configuration
            </SectionTitle>
            
            <FormGroup>
              <Label>Website URL</Label>
              <Input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  id="crawlMode"
                  checked={formData.crawlMode}
                  onChange={(e) => handleInputChange('crawlMode', e.target.checked)}
                />
                <CheckboxLabel htmlFor="crawlMode">
                  Enable crawling mode (follow links)
                </CheckboxLabel>
              </CheckboxGroup>
            </FormGroup>

            {formData.crawlMode && (
              <FormGroup>
                <Label>Maximum Pages to Crawl</Label>
                <Input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.maxPages}
                  onChange={(e) => handleInputChange('maxPages', parseInt(e.target.value))}
                />
              </FormGroup>
            )}
          </FormSection>

          <FormSection>
            <SectionTitle>
              <Settings size={20} />
              Scraping Rules
            </SectionTitle>
            
            {rules.length === 0 ? (
              <EmptyState>
                <p>No rules available. Please create some rules first.</p>
              </EmptyState>
            ) : (
              <RulesPreview>
                {rules.map((rule) => (
                  <RuleItem key={rule.id}>
                    <Checkbox
                      type="checkbox"
                      id={rule.id}
                      checked={formData.selectedRules.includes(rule.id)}
                      onChange={() => handleRuleToggle(rule.id)}
                    />
                    <RuleIcon color={ruleTypeColors[rule.type] || '#6366f1'}>
                      <FileText size={16} />
                    </RuleIcon>
                    <RuleName>{rule.name}</RuleName>
                    <RuleType>{rule.type}</RuleType>
                  </RuleItem>
                ))}
              </RulesPreview>
            )}
          </FormSection>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" disabled={loading || rules.length === 0}>
              <Play size={16} />
              {loading ? 'Scraping...' : 'Start Scraping'}
            </Button>
          </div>
        </form>
      </ScraperForm>

      {scrapingStatus && (
        <StatusCard>
          <StatusHeader>
            <StatusIcon color={getStatusColor(scrapingStatus.status)}>
              {getStatusIcon(scrapingStatus.status)}
            </StatusIcon>
            <div>
              <StatusTitle>
                {scrapingStatus.status === 'running' && 'Scraping in Progress'}
                {scrapingStatus.status === 'completed' && 'Scraping Completed'}
                {scrapingStatus.status === 'error' && 'Scraping Failed'}
              </StatusTitle>
              <StatusDescription>{scrapingStatus.message}</StatusDescription>
            </div>
          </StatusHeader>
          
          {scrapingStatus.status === 'running' && (
            <ProgressBar>
              <ProgressFill progress={scrapingStatus.progress} />
            </ProgressBar>
          )}
        </StatusCard>
      )}
    </ScraperContainer>
  );
}

export default Scraper;