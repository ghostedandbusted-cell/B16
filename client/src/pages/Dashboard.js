import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Play, 
  Settings, 
  BarChart3, 
  FileText, 
  Plus,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textLight};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const StatTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.color || props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || props.theme.colors.primary};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatDescription = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
  margin: 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const ActionCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.color || props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || props.theme.colors.primary};
`;

const ActionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ActionDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.textLight};
    cursor: not-allowed;
  }
`;

const RecentResults = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ResultInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ResultStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'success' ? props.theme.colors.accent : props.theme.colors.danger};
`;

const ResultUrl = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const ResultTime = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textLight};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textLight};
`;

function Dashboard({ rules, results, onRunScraping, loading }) {
  const [quickScrapeUrl, setQuickScrapeUrl] = useState('');

  const handleQuickScrape = async () => {
    if (!quickScrapeUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    if (rules.length === 0) {
      toast.error('Please create some rules first');
      return;
    }

    try {
      await onRunScraping({
        url: quickScrapeUrl,
        rules: rules,
        crawlMode: false
      });
      toast.success('Scraping completed!');
      setQuickScrapeUrl('');
    } catch (error) {
      toast.error('Scraping failed: ' + error.message);
    }
  };

  const totalRules = rules.length;
  const totalResults = results.length;
  const successfulScrapes = results.filter(r => r.status === 'success').length;
  const totalDataPoints = results.reduce((acc, result) => {
    return acc + Object.values(result.data || {}).reduce((sum, data) => sum + (data.count || 0), 0);
  }, 0);

  return (
    <DashboardContainer>
      <Header>
        <Title>Contact Scraper Dashboard</Title>
        <Subtitle>Extract contact information from websites with customizable rules</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatTitle>Active Rules</StatTitle>
            <StatIcon color="#6366f1">
              <Settings size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{totalRules}</StatValue>
          <StatDescription>Rules configured for data extraction</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Pages Scraped</StatTitle>
            <StatIcon color="#10b981">
              <BarChart3 size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{totalResults}</StatValue>
          <StatDescription>Total pages processed</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Success Rate</StatTitle>
            <StatIcon color="#f59e0b">
              <CheckCircle size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>
            {totalResults > 0 ? Math.round((successfulScrapes / totalResults) * 100) : 0}%
          </StatValue>
          <StatDescription>Successful extractions</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Data Points</StatTitle>
            <StatIcon color="#8b5cf6">
              <FileText size={20} />
            </StatIcon>
          </StatHeader>
          <StatValue>{totalDataPoints}</StatValue>
          <StatDescription>Total data points extracted</StatDescription>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <ActionCard>
          <ActionHeader>
            <ActionIcon color="#6366f1">
              <Play size={24} />
            </ActionIcon>
            <ActionTitle>Quick Scrape</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Scrape a single page using your configured rules
          </ActionDescription>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="url"
              placeholder="Enter URL to scrape..."
              value={quickScrapeUrl}
              onChange={(e) => setQuickScrapeUrl(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
            <ActionButton onClick={handleQuickScrape} disabled={loading}>
              <Play size={16} />
              {loading ? 'Scraping...' : 'Scrape'}
            </ActionButton>
          </div>
        </ActionCard>

        <ActionCard onClick={() => window.location.href = '/rules'}>
          <ActionHeader>
            <ActionIcon color="#10b981">
              <Settings size={24} />
            </ActionIcon>
            <ActionTitle>Manage Rules</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Create, edit, and organize your scraping rules
          </ActionDescription>
          <ActionButton>
            <Plus size={16} />
            Add Rules
          </ActionButton>
        </ActionCard>

        <ActionCard onClick={() => window.location.href = '/scraper'}>
          <ActionHeader>
            <ActionIcon color="#f59e0b">
              <ExternalLink size={24} />
            </ActionIcon>
            <ActionTitle>Advanced Scraper</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Configure sitemap crawling and advanced options
          </ActionDescription>
          <ActionButton>
            <Play size={16} />
            Configure
          </ActionButton>
        </ActionCard>

        <ActionCard onClick={() => window.location.href = '/results'}>
          <ActionHeader>
            <ActionIcon color="#8b5cf6">
              <BarChart3 size={24} />
            </ActionIcon>
            <ActionTitle>View Results</ActionTitle>
          </ActionHeader>
          <ActionDescription>
            Browse and export your scraping results
          </ActionDescription>
          <ActionButton>
            <BarChart3 size={16} />
            View Data
          </ActionButton>
        </ActionCard>
      </QuickActions>

      <RecentResults>
        <SectionTitle>Recent Results</SectionTitle>
        {results.length === 0 ? (
          <EmptyState>
            <p>No scraping results yet. Start by creating rules and running a scrape!</p>
          </EmptyState>
        ) : (
          results.slice(0, 5).map((result, index) => (
            <ResultItem key={index}>
              <ResultInfo>
                <ResultStatus status={result.status} />
                <ResultUrl>{result.url}</ResultUrl>
              </ResultInfo>
              <ResultTime>
                {new Date(result.timestamp).toLocaleString()}
              </ResultTime>
            </ResultItem>
          ))
        )}
      </RecentResults>
    </DashboardContainer>
  );
}

export default Dashboard;