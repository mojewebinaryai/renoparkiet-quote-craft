import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StarButton } from '@/components/ui/star-button';
import { Send, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  { icon: Phone, label: 'Telefon', value: '+48 123 456 789' },
  { icon: Mail, label: 'E-mail', value: 'kontakt@renoparkiet.pl' },
  { icon: MapPin, label: 'Obszar działania', value: 'Warszawa i okolice' },
  { icon: Clock, label: 'Godziny pracy', value: 'Pon-Pt: 8:00-18:00' },
];

const Kontakt = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: 'Uzupełnij wymagane pola', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/50">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Kontakt</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Skontaktuj się z nami</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Masz pytania? Napisz lub zadzwoń — chętnie pomożemy.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold">Dane kontaktowe</h2>
              <div className="space-y-4">
                {contactInfo.map(c => (
                  <div key={c.label} className="flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {submitted ? (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex flex-col items-center gap-4 py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold">Wiadomość wysłana!</h3>
                  <p className="text-sm text-muted-foreground text-center">Odpowiemy najszybciej jak to możliwe.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Send className="h-4 w-4 text-primary" />
                    </div>
                    Formularz kontaktowy
                  </CardTitle>
                  <CardDescription>Opisz swój projekt, a my się odezwiemy</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="mb-2 block text-sm font-medium">Imię i nazwisko *</Label>
                      <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jan Kowalski" className="bg-secondary/50 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block text-sm font-medium">E-mail *</Label>
                      <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan@example.com" className="bg-secondary/50 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="mb-2 block text-sm font-medium">Telefon</Label>
                      <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 123 456 789" className="bg-secondary/50 border-border/50" />
                    </div>
                    <div>
                      <Label htmlFor="message" className="mb-2 block text-sm font-medium">Wiadomość *</Label>
                      <Textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Opisz swój projekt..." rows={4} className="bg-secondary/50 border-border/50" />
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
                        Wyślij wiadomość
                      </span>
                    </StarButton>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Kontakt;
