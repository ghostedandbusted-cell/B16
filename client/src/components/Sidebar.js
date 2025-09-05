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
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  z-index: 200;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease;
  
  @media (min-width: 769px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  color: ${props => props.theme.colors.textLight};
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const Nav = styled.nav`
  padding: ${props => props.theme.spacing.lg} 0;
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
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
  }
  
  &.active {
    background: ${props => props.theme.colors.primary}10;
    color: ${props => props.theme.colors.primary};
    border-left-color: ${props => props.theme.colors.primary};
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