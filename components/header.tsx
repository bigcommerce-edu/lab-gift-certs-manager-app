'use client';

import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getSessionTokenFromQueryParams, getUrl } from '@/lib/session';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const NavList = styled.ul`
  margin: 20px;
`;

const NavListItem = styled.li`
  display: inline-block;
  margin: 0 20px 0 0;
  padding: 0 0 0 20px;
  border-left: 1px solid rgb(var(--foreground-rgb));
`;

const NavLink = styled.a`
  color: #0d52ff;
`;

const Header = ({
  className
}: { 
  className?: string 
}) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const sessionToken = (searchParams !== null) ? getSessionTokenFromQueryParams(searchParams) : null;

  const router = useRouter();

  const navRoutes: Record<string, string> = {
    home: '/',
    active: '/active',
  };
  
  const navItems = [
    {
      id: 'home',
      title: "Home",
    },
    {
      id: 'active',
      title: "Active Gift Certificates",
    }
  ];

  const activeTab = navItems.find(navItem => {
    const navItemPath = navRoutes[navItem.id] ?? '';
    return navItemPath === path;
  });

  const handleTabClick = (tabId: string) => {
    const navItemPath = navRoutes[tabId] ?? '';
    if (navItemPath) {
      router.push(sessionToken ? `${navItemPath}?session=${sessionToken}` : navItemPath);
    }
  };

  return (
    <header className={className}>
      <NavList>
        {navItems.map(navItem => (
          <NavListItem key={navItem.id}>
            {navItem === activeTab ? (
              <span>{navItem.title}</span>
            ) : (
              <NavLink href="#" 
                onClick={e => { e.preventDefault(); handleTabClick(navItem.id); } }
              >{navItem.title}</NavLink>
            )}
          </NavListItem>
        ))}
      </NavList>
    </header>
  )
};

export default Header;
