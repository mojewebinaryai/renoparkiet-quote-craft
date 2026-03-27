import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from './NavLink';
import logo from '@/assets/logo.png';

const navItems = [
  { to: '/', label: 'Strona główna' },
  { to: '/oferta', label: 'Oferta' },
  { to: '/realizacje', label: 'Realizacje' },
  { to: '/kalkulator', label: 'Kalkulator' },
  { to: '/blog', label: 'Blog' },
  { to: '/kontakt', label: 'Kontakt' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group no-underline">
          <img src={logo} alt="Renoparkiet" width={36} height={36} className="rounded" />
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-foreground">
              Renoparkiet
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Renowacja podłóg
            </p>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeClassName="text-primary bg-primary/10"
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              activeClassName="text-primary"
              onClick={() => setMobileOpen(false)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
