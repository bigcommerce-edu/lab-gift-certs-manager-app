'use client';

import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getSessionTokenFromQueryParams, getUrl } from '@/lib/session';
import { useRouter } from 'next/navigation';
import { Box, Tabs } from '@bigcommerce/big-design';

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
      <Box margin="xxLarge">
        <Tabs
          activeTab={activeTab?.id}
          items={navItems}
          onTabClick={handleTabClick}
        />
      </Box>
    </header>
  )
};

export default Header;
