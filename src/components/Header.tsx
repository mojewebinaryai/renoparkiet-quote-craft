import { Hammer } from 'lucide-react';

const Header = () => (
  <header className="border-b border-border bg-card">
    <div className="container mx-auto flex items-center gap-3 px-4 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
        <Hammer className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Renoparkiet</h1>
        <p className="text-xs text-muted-foreground">Profesjonalna renowacja podłóg</p>
      </div>
    </div>
  </header>
);

export default Header;
