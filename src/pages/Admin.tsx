import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getServices, saveServices, Service } from '@/lib/priceStore';
import { Lock, Save, Settings, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ADMIN_PASSWORD = 'admin123';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [services, setServicesState] = useState<Service[]>(getServices);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      toast({ title: 'Nieprawidłowe hasło', variant: 'destructive' });
    }
  };

  const updatePrice = (id: string, value: string) => {
    setServicesState(prev =>
      prev.map(s => s.id === id ? { ...s, pricePerM2: parseFloat(value) || 0 } : s)
    );
  };

  const handleSave = () => {
    saveServices(services);
    toast({ title: 'Ceny zostały zapisane' });
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto max-w-sm px-4 py-20">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary border border-border/50 mb-2">
                <Lock className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="font-display">Panel administracyjny</CardTitle>
              <CardDescription>Wprowadź hasło, aby kontynuować</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border/50 focus:border-primary/50"
                />
                <Button type="submit" className="w-full">Zaloguj się</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-10">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Settings className="h-4 w-4 text-primary" />
              </div>
              Zarządzanie cenami
            </CardTitle>
            <CardDescription>Zmień stawki za m² dla poszczególnych usług</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map(s => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                <Label className="text-sm font-medium flex-1">{s.namePl}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-24 text-right bg-secondary/50 border-border/50"
                    value={s.pricePerM2}
                    onChange={e => updatePrice(s.id, e.target.value)}
                  />
                  <span className="text-xs text-muted-foreground font-medium">zł/m²</span>
                </div>
              </div>
            ))}
            <Button onClick={handleSave} className="w-full mt-2">
              <Save className="mr-2 h-4 w-4" />
              Zapisz zmiany
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
