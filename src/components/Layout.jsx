import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-1 ${isAdmin ? '' : ''}`}>
        <Outlet />
      </main>
      {!isAdmin && !isHome && null}
    </div>
  );
}