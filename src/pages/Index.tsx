import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NavLink } from '@/components/NavLink';
import { StarButton } from '@/components/ui/star-button';
import { getServices } from '@/lib/priceStore';
import { Sneak } from '@/components/ui/sneak';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Award,
  Layers,
  Paintbrush,
  Droplets,
  Wrench,
  RulerIcon,
  ChevronRight,
  Star,
} from 'lucide-react';

const services = [
  { icon: Layers, title: 'Cyklinowanie', desc: 'Profesjonalne szlifowanie parkietu przywracające naturalny wygląd drewna.' },
  { icon: Paintbrush, title: 'Lakierowanie', desc: 'Trwałe zabezpieczenie podłogi lakierem w wybranym połysku.' },
  { icon: Droplets, title: 'Olejowanie', desc: 'Naturalna ochrona olejem podkreślająca strukturę drewna.' },
  { icon: Wrench, title: 'Uzupełnianie ubytków', desc: 'Naprawa uszkodzeń i wypełnienie szczelin w parkiecie.' },
  { icon: RulerIcon, title: 'Montaż listew', desc: 'Precyzyjny montaż listew przypodłogowych dopasowanych do podłogi.' },
];

const projects = [
  { title: 'Apartament na Mokotowie', area: '85 m²', type: 'Cyklinowanie + Olejowanie' },
  { title: 'Kamienica na Pradze', area: '120 m²', type: 'Renowacja kompletna' },
  { title: 'Dom jednorodzinny Wilanów', area: '200 m²', type: 'Lakierowanie' },
];

const stats = [
  { value: '500+', label: 'Realizacji' },
  { value: '15', label: 'Lat doświadczenia' },
  { value: '98%', label: 'Zadowolonych klientów' },
  { value: '24h', label: 'Czas odpowiedzi' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Interactive Sneak Banner */}
      <section className="relative w-full h-[300px] md:h-[400px] border-b border-border/50">
        <Sneak text="RenoParkiet" />
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="container mx-auto max-w-6xl px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Profesjonalna renowacja podłóg drewnianych
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Twoje podłogi
              <br />
              zasługują na
              <br />
              <span className="text-primary">nowe życie</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Specjalizujemy się w renowacji parkietów i podłóg drewnianych.
              Przywracamy im blask, trwałość i naturalne piękno.
            </p>
            <div className="flex flex-wrap gap-4">
              <NavLink to="/kalkulator">
                <StarButton lightColor="hsl(38, 92%, 50%)" backgroundColor="hsl(38, 92%, 50%)" duration={4} borderWidth={1} className="rounded-lg">
                  <span className="flex items-center gap-2 text-foreground font-semibold">
                    Bezpłatna wycena
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </StarButton>
              </NavLink>
              <NavLink to="/realizacje" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded-lg hover:border-border">
                Zobacz realizacje
                <ChevronRight className="h-4 w-4" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/50 bg-card/30">
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">O nas</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Doświadczenie,
                <br />któremu zaufasz
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Od ponad 15 lat zajmujemy się profesjonalną renowacją podłóg drewnianych
                na terenie Warszawy i okolic. Łączymy tradycyjne rzemiosło z nowoczesnymi
                technologiami, aby Twoje podłogi wyglądały jak nowe.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Shield, text: 'Gwarancja na wszystkie usługi' },
                  { icon: Clock, text: 'Terminowa realizacja zleceń' },
                  { icon: Award, text: 'Certyfikowani specjaliści' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-secondary/50 border border-border/50 overflow-hidden flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Zdjęcie zespołu / realizacji</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="border-b border-border/50 bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Oferta</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Kompleksowa renowacja podłóg
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Oferujemy pełen zakres usług renowacyjnych — od szlifowania po wykończenie.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <div key={s.title} className="rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 transition-colors group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <NavLink to="/oferta" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Zobacz pełną ofertę <ArrowRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Realizacje</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Nasze ostatnie projekty
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p.title} className="group rounded-xl border border-border/50 bg-card/50 overflow-hidden hover:border-primary/30 transition-colors">
                <div className="aspect-[16/10] bg-secondary/50 flex items-center justify-center">
                  <p className="text-muted-foreground text-xs">Zdjęcie realizacji</p>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.area} · {p.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <NavLink to="/realizacje" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Wszystkie realizacje <ArrowRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border/50 bg-card/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Opinie</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Co mówią nasi klienci
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Anna K.', text: 'Fantastyczna robota! Parkiet wygląda jak nowy. Polecam z całego serca.' },
              { name: 'Marcin W.', text: 'Profesjonalne podejście, terminowa realizacja. Na pewno wrócę przy kolejnym remoncie.' },
              { name: 'Katarzyna S.', text: 'Bardzo dokładni i czysto po sobie zostawili. Efekt przeszedł moje oczekiwania.' },
            ].map(t => (
              <div key={t.name} className="rounded-xl border border-border/50 bg-card/50 p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24 text-center relative">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Gotowy na piękne podłogi?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Skontaktuj się z nami lub skorzystaj z kalkulatora, aby otrzymać bezpłatną wycenę.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <NavLink to="/kalkulator">
              <StarButton lightColor="hsl(38, 92%, 50%)" backgroundColor="hsl(38, 92%, 50%)" duration={4} borderWidth={1} className="rounded-lg">
                <span className="flex items-center gap-2 text-foreground font-semibold">
                  Kalkulator wyceny <ArrowRight className="h-4 w-4" />
                </span>
              </StarButton>
            </NavLink>
            <NavLink to="/kontakt" className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border border-border/50 rounded-lg hover:border-border">
              Kontakt <ChevronRight className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
