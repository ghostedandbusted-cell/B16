import React from 'react';
import styled from 'styled-components';
import { Menu, Settings, User } from 'lucide-react';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  display: none;
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

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
  margin: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
`;

function Header({ onMenuClick }) {
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={onMenuClick}>
          <Menu size={20} />
        </MenuButton>
        <Logo>Contact Scraper</Logo>
      </LeftSection>
      
      <RightSection>
        <StatusIndicator>
          <StatusDot />
          <span>Ready</span>
        </StatusIndicator>
        
        <IconButton title="Settings">
          <Settings size={20} />
        </IconButton>
        
        <IconButton title="Profile">
          <User size={20} />
        </IconButton>
      </RightSection>
    </HeaderContainer>
  );
}

export default Header;