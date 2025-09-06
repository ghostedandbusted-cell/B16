import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Home, 
  Settings, 
  Play, 
  BarChart3, 
  FileText, 
  X 
} from 'lucide-react';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: white;
  border-right: 1px solid #e2e8f0;
  z-index: 200;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  
  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  display: block;
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

  @media (min-width: 769px) {
    display: none;
  }
`;

const Nav = styled.nav`
  padding: 1.5rem 0;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
  
  &.active {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
    border-left-color: #6366f1;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/rules', label: 'Rule Builder', icon: Settings },
  { path: '/scraper', label: 'Scraper', icon: Play },
  { path: '/results', label: 'Results', icon: BarChart3 },
  { path: '/templates', label: 'Templates', icon: FileText },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
            Navigation
          </h2>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </SidebarHeader>
        
        <Nav>
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.path}>
                <StyledNavLink to={item.path} onClick={onClose}>
                  <IconWrapper>
                    <item.icon size={20} />
                  </IconWrapper>
                  {item.label}
                </StyledNavLink>
              </NavItem>
            ))}
          </NavList>
        </Nav>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;