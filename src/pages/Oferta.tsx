import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NavLink } from '@/components/NavLink';
import { StarButton } from '@/components/ui/star-button';
import { getServices } from '@/lib/priceStore';
import { Layers, Paintbrush, Droplets, Wrench, RulerIcon, ArrowRight, CheckCircle2 } from 'lucide-react';

const serviceDetails = [
  {
    id: 'sanding',
    icon: Layers,
    title: 'Cyklinowanie',
    desc: 'Profesjonalne szlifowanie parkietu za pomocą nowoczesnych maszyn bezpyłowych. Usuwamy stare warstwy lakieru, nierówności i zarysowania, przywracając drewnu naturalny wygląd.',
    features: ['Maszyny bezpyłowe', 'Wieloetapowe szlifowanie', 'Precyzyjne wykończenie'],
  },
  {
    id: 'lacquering',
    icon: Paintbrush,
    title: 'Lakierowanie',
    desc: 'Zabezpieczenie podłogi wysokiej jakości lakierami poliuretanowymi lub wodnymi. Oferujemy różne stopnie połysku — od matowego po wysoki połysk.',
    features: ['Lakiery premium', 'Wybór połysku', 'Trwałość na lata'],
  },
  {
    id: 'oiling',
    icon: Droplets,
    title: 'Olejowanie',
    desc: 'Naturalna metoda zabezpieczenia drewna olejami, która podkreśla strukturę i ciepło parkietu. Idealna dla miłośników naturalnego wyglądu.',
    features: ['Oleje naturalne', 'Głęboka penetracja', 'Łatwa renowacja'],
  },
  {
    id: 'filling',
    icon: Wrench,
    title: 'Uzupełnianie ubytków',
    desc: 'Profesjonalna naprawa uszkodzonych fragmentów parkietu. Wypełniamy szczeliny, uzupełniamy brakujące klepki i naprawiamy pęknięcia.',
    features: ['Dopasowanie kolorystyczne', 'Klepki wymienne', 'Szpachlowanie'],
  },
  {
    id: 'skirting',
    icon: RulerIcon,
    title: 'Montaż listew przypodłogowych',
    desc: 'Precyzyjny montaż listew w różnych profilach i kolorach. Dopasowujemy je idealnie do odnowionej podłogi i stylu wnętrza.',
    features: ['Szeroki wybór profili', 'Precyzyjne cięcia', 'Estetyczne wykończenie'],
  },
];

const Oferta = () => {
  const prices = getServices();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border/50">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Oferta</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Nasze usługi
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Kompleksowa renowacja podłóg drewnianych — od szlifowania po wykończenie.
              Każda usługa wykonana z najwyższą dbałością o szczegóły.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto max-w-6xl px-4 py-16 space-y-6">
          {serviceDetails.map((s, i) => {
            const price = prices.find(p => p.id === s.id);
            return (
              <div key={s.id} className="rounded-xl border border-border/50 bg-card/50 p-6 md:p-8 hover:border-primary/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h2 className="font-display text-xl font-bold">{s.title}</h2>
                      {price && (
                        <span className="text-lg font-bold text-primary">{price.pricePerM2} zł/m²</span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex flex-wrap gap-3">
                      {s.features.map(f => (
                        <span key={f} className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary/50 border border-border/50 rounded-full px-3 py-1">
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <section className="border-t border-border/50 bg-card/20">
          <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Zainteresowany?</h2>
            <p className="text-muted-foreground mb-8">Skorzystaj z kalkulatora i otrzymaj bezpłatną wycenę online.</p>
            <NavLink to="/kalkulator">
              <StarButton lightColor="hsl(38, 92%, 50%)" backgroundColor="hsl(38, 92%, 50%)" duration={4} borderWidth={1} className="rounded-lg">
                <span className="flex items-center gap-2 text-foreground font-semibold">
                  Kalkulator wyceny <ArrowRight className="h-4 w-4" />
                </span>
              </StarButton>
            </NavLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Oferta;
