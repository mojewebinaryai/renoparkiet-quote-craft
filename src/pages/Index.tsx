import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getServices } from '@/lib/priceStore';
import { Calculator, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8 space-y-6">
        {/* Calculator Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Kalkulator wyceny
            </CardTitle>
            <CardDescription>Oszacuj koszt renowacji podłogi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="area" className="mb-1.5 block text-sm font-medium">
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
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Wybierz usługi</Label>
              {services.map(s => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 transition-colors hover:bg-muted has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selected.includes(s.id)}
                      onCheckedChange={() => toggle(s.id)}
                    />
                    <span className="text-sm font-medium">{s.namePl}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{s.pricePerM2} zł/m²</span>
                </label>
              ))}
            </div>

            {/* Summary */}
            {areaNum > 0 && selected.length > 0 && (
              <div className="rounded-md bg-muted p-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Podsumowanie</p>
                {services.filter(s => selected.includes(s.id)).map(s => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span>{s.namePl}</span>
                    <span>{(s.pricePerM2 * areaNum).toFixed(2)} zł</span>
                  </div>
                ))}
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
                  <span>Razem (szacunek)</span>
                  <span className="text-primary">{totalPrice.toFixed(2)} zł</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Form */}
        {submitted ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-10">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h3 className="text-lg font-semibold">Dziękujemy!</h3>
              <p className="text-sm text-muted-foreground text-center">
                Twoje zapytanie zostało wysłane. Skontaktujemy się wkrótce z formalną wyceną.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Uzyskaj formalną wycenę
              </CardTitle>
              <CardDescription>Podaj dane kontaktowe, a my przygotujemy ofertę</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block text-sm font-medium">Imię i nazwisko</Label>
                  <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jan Kowalski" />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1.5 block text-sm font-medium">Adres e-mail</Label>
                  <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Numer telefonu</Label>
                  <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 123 456 789" />
                </div>
                <div>
                  <Label htmlFor="address" className="mb-1.5 block text-sm font-medium">Adres inwestycji</Label>
                  <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="ul. Przykładowa 1, Warszawa" />
                </div>
                <Button type="submit" className="w-full">
                  Wyślij zapytanie
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
