import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NavLink } from '@/components/NavLink';
import { StarButton } from '@/components/ui/star-button';
import { ArrowRight } from 'lucide-react';

const projects = [
  { title: 'Apartament na Mokotowie', area: '85 m²', type: 'Cyklinowanie + Olejowanie', year: '2024' },
  { title: 'Kamienica na Pradze', area: '120 m²', type: 'Renowacja kompletna', year: '2024' },
  { title: 'Dom jednorodzinny Wilanów', area: '200 m²', type: 'Lakierowanie', year: '2024' },
  { title: 'Biuro na Śródmieściu', area: '150 m²', type: 'Cyklinowanie + Lakierowanie', year: '2023' },
  { title: 'Mieszkanie Żoliborz', area: '60 m²', type: 'Olejowanie', year: '2023' },
  { title: 'Willa Konstancin', area: '300 m²', type: 'Renowacja kompletna', year: '2023' },
];

const Realizacje = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Portfolio</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Nasze realizacje</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Przegląd wybranych projektów renowacji podłóg drewnianych.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <div key={p.title} className="group rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:border-primary/30 transition-colors">
              <div className="aspect-[16/10] bg-secondary/50 flex items-center justify-center">
                <p className="text-muted-foreground text-xs">Zdjęcie realizacji</p>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.area} · {p.type}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-card/20">
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Chcesz taki efekt?</h2>
          <p className="text-muted-foreground mb-8">Skontaktuj się z nami lub oblicz wycenę online.</p>
          <NavLink to="/kalkulator">
            <StarButton lightColor="hsl(38, 92%, 50%)" backgroundColor="hsl(38, 92%, 50%)" duration={4} borderWidth={1} className="rounded-lg">
              <span className="flex items-center gap-2 text-foreground font-semibold">
                Bezpłatna wycena <ArrowRight className="h-4 w-4" />
              </span>
            </StarButton>
          </NavLink>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Realizacje;
