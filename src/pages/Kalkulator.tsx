import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { StarButton } from '@/components/ui/star-button';
import { getServices } from '@/lib/priceStore';
import { Calculator, Send, CheckCircle2, Ruler } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Kalkulator = () => {
  const services = getServices();
  const [area, setArea] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const areaNum = parseFloat(area) || 0;

  const totalPrice = useMemo(() => {
    return services
      .filter(s => selected.includes(s.id))
      .reduce((sum, s) => sum + s.pricePerM2 * areaNum, 0);
  }, [services, selected, areaNum]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !email.trim()) {
      toast({ title: 'Uzupełnij wszystkie pola', variant: 'destructive' });
      return;
    }
    if (selected.length === 0 || areaNum <= 0) {
      toast({ title: 'Wybierz usługi i podaj powierzchnię', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto max-w-2xl px-4 py-10 space-y-8">
        <div className="text-center mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Kalkulator</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Wycena online</h1>
          <p className="text-muted-foreground mt-2">Oblicz szacunkowy koszt renowacji podłogi</p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Calculator className="h-4 w-4 text-primary" />
              </div>
              Kalkulator wyceny
            </CardTitle>
            <CardDescription>Oszacuj koszt renowacji podłogi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="area" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                Powierzchnia (m²)
              </Label>
              <Input
                id="area"
                type="number"
                min="0"
                step="0.1"
                placeholder="np. 45"
                value={area}
                onChange={e => setArea(e.target.value)}
                className="bg-secondary/50 border-border/50 focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Wybierz usługi</Label>
              {services.map(s => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4 transition-all hover:bg-secondary/60 hover:border-border has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selected.includes(s.id)}
                      onCheckedChange={() => toggle(s.id)}
                    />
                    <span className="text-sm font-medium text-foreground">{s.namePl}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{s.pricePerM2} zł/m²</span>
                </label>
              ))}
            </div>

            {areaNum > 0 && selected.length > 0 && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Podsumowanie</p>
                {services.filter(s => selected.includes(s.id)).map(s => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{s.namePl}</span>
                    <span className="text-foreground font-medium">{(s.pricePerM2 * areaNum).toFixed(2)} zł</span>
                  </div>
                ))}
                <div className="border-t border-primary/20 pt-3 flex justify-between items-center">
                  <span className="font-semibold text-foreground">Razem (szacunek)</span>
                  <span className="text-xl font-bold text-primary">{totalPrice.toFixed(2)} zł</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {submitted ? (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">Dziękujemy!</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Twoje zapytanie zostało wysłane. Skontaktujemy się wkrótce z formalną wyceną.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Send className="h-4 w-4 text-primary" />
                </div>
                Uzyskaj formalną wycenę
              </CardTitle>
              <CardDescription>Podaj dane kontaktowe, a my przygotujemy ofertę</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-sm font-medium">Imię i nazwisko</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jan Kowalski" className="bg-secondary/50 border-border/50 focus:border-primary/50" />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium">Adres e-mail</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan@example.com" className="bg-secondary/50 border-border/50 focus:border-primary/50" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block text-sm font-medium">Numer telefonu</Label>
                  <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 123 456 789" className="bg-secondary/50 border-border/50 focus:border-primary/50" />
                </div>
                <div>
                  <Label htmlFor="address" className="mb-2 block text-sm font-medium">Adres inwestycji</Label>
                  <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="ul. Przykładowa 1, Warszawa" className="bg-secondary/50 border-border/50 focus:border-primary/50" />
                </div>
                <StarButton
                  lightColor="hsl(38, 92%, 50%)"
                  backgroundColor="hsl(38, 92%, 50%)"
                  duration={4}
                  borderWidth={1}
                  className="w-full rounded-lg"
                  type="submit"
                >
                  <span className="flex items-center justify-center gap-2 text-foreground font-semibold w-full">
                    <Send className="h-4 w-4" />
                    Wyślij zapytanie
                  </span>
                </StarButton>
              </form>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Kalkulator;
