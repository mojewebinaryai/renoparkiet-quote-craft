import { Hammer, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from './NavLink';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group no-underline">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 transition-all group-hover:bg-primary/20 group-hover:border-primary/40">
            <Hammer className="h-5 w-5 text-primary" />
          </div>
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
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            activeClassName="text-primary bg-primary/10"
          >
            Kalkulator
          </NavLink>
          <NavLink
            to="/admin"
            className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            activeClassName="text-primary bg-primary/10"
          >
            Panel
          </NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 py-3 space-y-1">
          <NavLink
            to="/"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
            activeClassName="text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Kalkulator
          </NavLink>
          <NavLink
            to="/admin"
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            activeClassName="text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Panel administracyjny
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
