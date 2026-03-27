import { NavLink } from './NavLink';
import logo from '@/assets/logo.png';

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Renoparkiet" width={32} height={32} className="rounded" />
            <span className="font-display text-lg font-bold">Renoparkiet</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Profesjonalna renowacja podłóg drewnianych. Jakość i doświadczenie, którym możesz zaufać.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Nawigacja</h4>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Strona główna' },
              { to: '/oferta', label: 'Oferta' },
              { to: '/realizacje', label: 'Realizacje' },
              { to: '/blog', label: 'Blog' },
            ].map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Usługi</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Cyklinowanie</li>
            <li>Lakierowanie</li>
            <li>Olejowanie</li>
            <li>Uzupełnianie ubytków</li>
            <li>Montaż listew</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-3">Kontakt</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>📞 +48 123 456 789</li>
            <li>✉️ kontakt@renoparkiet.pl</li>
            <li>📍 Warszawa i okolice</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-border/50 pt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Renoparkiet. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
