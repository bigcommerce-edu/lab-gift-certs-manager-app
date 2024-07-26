'use client';

import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getSessionTokenFromQueryParams, getUrl } from '@/lib/session';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Header = ({
  className
}: { 
  className?: string 
}) => {
  return (
    <header className={className}>
      Header
    </header>
  )
};

export default Header;
