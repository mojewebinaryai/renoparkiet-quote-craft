import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getServices, saveServices, Service } from '@/lib/priceStore';
import { Lock, Save } from 'lucide-react';
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
        <main className="container mx-auto max-w-sm px-4 py-16">
          <Card>
            <CardHeader className="items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardTitle>Panel administracyjny</CardTitle>
              <CardDescription>Wprowadź hasło, aby kontynuować</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Zarządzanie cenami</CardTitle>
            <CardDescription>Zmień stawki za m² dla poszczególnych usług</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map(s => (
              <div key={s.id} className="flex items-center justify-between gap-4 rounded-md border border-border p-3">
                <Label className="text-sm font-medium flex-1">{s.namePl}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-24 text-right"
                    value={s.pricePerM2}
                    onChange={e => updatePrice(s.id, e.target.value)}
                  />
                  <span className="text-sm text-muted-foreground">zł/m²</span>
                </div>
              </div>
            ))}
            <Button onClick={handleSave} className="w-full">
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
