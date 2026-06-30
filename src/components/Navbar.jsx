import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Услуги', path: '/services' },
  { label: 'О нас', path: '/about' },
  { label: 'Контакты', path: '/contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return null;

  const isHero = location.pathname === '/';
  const navBg = scrolled || !isHero
    ? 'bg-white shadow-md'
    : 'bg-transparent';
  const textColor = scrolled || !isHero ? 'text-[#0A192F]' : 'text-white';
  const logoColor = scrolled || !isHero ? 'text-[#0052CC]' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://media.base44.com/images/public/6a439266723bb2089c62b4cc/63dfd38d8_image.png"
              alt="ВладТрансЛогист"
              className={`h-10 w-auto transition-all duration-300 ${scrolled || !isHero ? '' : 'brightness-0 invert'}`}
            />
            <div className="flex flex-col leading-none">
              <span className={`font-black text-sm tracking-widest uppercase transition-colors duration-300 ${logoColor}`}>
                ВладТранс
              </span>
              <span className={`mono text-xs font-medium transition-colors duration-300 ${scrolled || !isHero ? 'text-[#0052CC]' : 'text-blue-200'}`}>
                ЛОГИСТ
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link mono text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${textColor} ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/login" className={`nav-link mono text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${textColor}`}>
              Вход
            </Link>
            <Link to="/contacts" className="btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-wider px-6 py-2.5 border border-[#0052CC] transition-colors duration-300 hover:border-[#2684FF] rounded-xl">
              Заявка
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden transition-colors duration-300 ${textColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A192F] border-t border-white/10">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link text-white mono text-sm uppercase tracking-wider py-2 border-b border-white/10 ${location.pathname === item.path ? 'text-[#2684FF]' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="nav-link text-white mono text-sm uppercase tracking-wider py-2 border-b border-white/10"
            >
              Вход
            </Link>
            <Link
              to="/contacts"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-wider px-6 py-3 text-center rounded-xl"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}