import SiteFooter from '@/components/site-footer';
import SiteHeader from '@/components/site-header';

import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
