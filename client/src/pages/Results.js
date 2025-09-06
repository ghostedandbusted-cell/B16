import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { 
  Download, 
  Eye, 
  Filter, 
  Search, 
  FileText,
  BarChart3,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const ResultsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#6366f1' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#1e293b'};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : '#e2e8f0'};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#4f46e5' : '#f1f5f9'};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StatTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const StatDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const FiltersSection = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: end;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
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

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const ResultsTable = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #1e293b;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  
  &:hover {
    background: #f1f5f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const UrlCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UrlText = styled.span`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'success' ? '#10b981' : '#ef4444'};
`;

const DataCell = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const TimeCell = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #64748b;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const ExpandedRow = styled.div`
  background: #f1f5f9;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const DataSection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DataTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const DataList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const DataItem = styled.span`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  color: #1e293b;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: white;
  border-top: 1px solid #e2e8f0;
`;

const PageButton = styled.button`
  background: ${props => props.active ? '#6366f1' : 'transparent'};
  color: ${props => props.active ? 'white' : '#1e293b'};
  border: 1px solid ${props => props.active ? 'transparent' : '#e2e8f0'};
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#4f46e5' : '#f1f5f9'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Results({ results, onRefresh }) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all'
  });
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResults = useMemo(() => {
    return results.filter(result => {
      const matchesSearch = !filters.search || 
        result.url.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || result.status === filters.status;
      
      return matchesSearch && matchesStatus;
    });
  }, [results, filters]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handleExport = async (format) => {
    try {
      const response = await fetch(`/api/export/${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scraping-results.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error('Export failed: ' + error.message);
    }
  };

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const totalDataPoints = results.reduce((acc, result) => {
    return acc + Object.values(result.data || {}).reduce((sum, data) => sum + (data.count || 0), 0);
  }, 0);

  const successfulScrapes = results.filter(r => r.status === 'success').length;
  const failedScrapes = results.filter(r => r.status === 'error').length;

  return (
    <ResultsContainer>
      <Header>
        <Title>Scraping Results</Title>
        <HeaderActions>
          <Button onClick={onRefresh}>
            <Eye size={16} />
            Refresh
          </Button>
          <Button onClick={() => handleExport('csv')}>
            <Download size={16} />
            Export CSV
          </Button>
          <Button onClick={() => handleExport('json')}>
            <Download size={16} />
            Export JSON
          </Button>
        </HeaderActions>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatTitle>Total Pages</StatTitle>
            <StatIcon color="#6366f1">
              <FileText size={16} />
            </StatIcon>
          </StatHeader>
          <StatValue>{results.length}</StatValue>
          <StatDescription>Pages processed</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Data Points</StatTitle>
            <StatIcon color="#10b981">
              <BarChart3 size={16} />
            </StatIcon>
          </StatHeader>
          <StatValue>{totalDataPoints}</StatValue>
          <StatDescription>Total extracted</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Success Rate</StatTitle>
            <StatIcon color="#f59e0b">
              <CheckCircle size={16} />
            </StatIcon>
          </StatHeader>
          <StatValue>
            {results.length > 0 ? Math.round((successfulScrapes / results.length) * 100) : 0}%
          </StatValue>
          <StatDescription>Successful extractions</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatTitle>Failed</StatTitle>
            <StatIcon color="#ef4444">
              <XCircle size={16} />
            </StatIcon>
          </StatHeader>
          <StatValue>{failedScrapes}</StatValue>
          <StatDescription>Failed extractions</StatDescription>
        </StatCard>
      </StatsGrid>

      <FiltersSection>
        <FilterRow>
          <FilterGroup>
            <Label>Search URLs</Label>
            <Input
              type="text"
              placeholder="Search by URL..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </FilterGroup>
          
          <FilterGroup>
            <Label>Status</Label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </Select>
          </FilterGroup>
          
          <FilterGroup>
            <Label>Date Range</Label>
            <Select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </Select>
          </FilterGroup>
        </FilterRow>
      </FiltersSection>

      <ResultsTable>
        <TableHeader>
          <div>URL</div>
          <div>Status</div>
          <div>Data Points</div>
          <div>Timestamp</div>
          <div>Actions</div>
        </TableHeader>

        {paginatedResults.length === 0 ? (
          <EmptyState>
            <p>No results found matching your filters.</p>
          </EmptyState>
        ) : (
          paginatedResults.map((result, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const isExpanded = expandedRows.has(globalIndex);
            const dataPoints = Object.values(result.data || {}).reduce((sum, data) => sum + (data.count || 0), 0);
            
            return (
              <React.Fragment key={globalIndex}>
                <TableRow>
                  <UrlCell>
                    <UrlText onClick={() => window.open(result.url, '_blank')}>
                      {result.url}
                    </UrlText>
                    <ExternalLink size={14} />
                  </UrlCell>
                  
                  <StatusCell>
                    <StatusIcon status={result.status} />
                    <span style={{ textTransform: 'capitalize' }}>
                      {result.status}
                    </span>
                  </StatusCell>
                  
                  <DataCell>{dataPoints}</DataCell>
                  
                  <TimeCell>
                    {new Date(result.timestamp).toLocaleString()}
                  </TimeCell>
                  
                  <div>
                    <ExpandButton onClick={() => toggleExpanded(globalIndex)}>
                      <Eye size={16} />
                    </ExpandButton>
                  </div>
                </TableRow>

                {isExpanded && (
                  <ExpandedRow>
                    {Object.entries(result.data || {}).map(([ruleName, data]) => (
                      <DataSection key={ruleName}>
                        <DataTitle>{ruleName} ({data.count || 0} matches)</DataTitle>
                        <DataList>
                          {(data.matches || []).slice(0, 10).map((match, matchIndex) => (
                            <DataItem key={matchIndex}>{match}</DataItem>
                          ))}
                          {(data.matches || []).length > 10 && (
                            <DataItem>... and {(data.matches || []).length - 10} more</DataItem>
                          )}
                        </DataList>
                      </DataSection>
                    ))}
                  </ExpandedRow>
                )}
              </React.Fragment>
            );
          })
        )}
      </ResultsTable>

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <PageButton
              key={page}
              active={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PageButton>
          ))}
          
          <PageButton
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </Pagination>
      )}
    </ResultsContainer>
  );
}

export default Results;