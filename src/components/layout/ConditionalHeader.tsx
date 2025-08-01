'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show header on admin or affiliate dashboard pages
  const hideHeaderPaths = ['/admin', '/affiliate/dashboard'];
  const shouldHideHeader = hideHeaderPaths.some(path => pathname.startsWith(path));
  
  if (shouldHideHeader) {
    return null;
  }
  
  return <Header />;
}