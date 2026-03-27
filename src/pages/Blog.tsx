import Header from '@/components/Header';
import Footer from '@/components/Footer';

const posts = [
  {
    title: 'Jak dbać o parkiet drewniany — poradnik',
    excerpt: 'Praktyczne wskazówki dotyczące codziennej pielęgnacji podłóg drewnianych, które przedłużą ich żywotność na lata.',
    date: '15 marca 2024',
    category: 'Poradniki',
  },
  {
    title: 'Lakierowanie vs olejowanie — co wybrać?',
    excerpt: 'Porównanie dwóch najpopularniejszych metod wykończenia parkietu. Zalety, wady i dla kogo każda opcja będzie najlepsza.',
    date: '2 marca 2024',
    category: 'Porównania',
  },
  {
    title: 'Kiedy czas na renowację parkietu?',
    excerpt: '5 sygnałów, które mówią, że Twoja podłoga drewniana wymaga profesjonalnej renowacji.',
    date: '18 lutego 2024',
    category: 'Porady',
  },
  {
    title: 'Trendy w wykończeniach podłóg 2024',
    excerpt: 'Najnowsze trendy w kolorach, wykończeniach i materiałach do podłóg drewnianych.',
    date: '5 lutego 2024',
    category: 'Trendy',
  },
];

const Blog = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="border-b border-border/50">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Blog</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">Wiedza i porady</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Artykuły o pielęgnacji, renowacji i trendach w podłogach drewnianych.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <div className="space-y-6">
          {posts.map(p => (
            <article key={p.title} className="rounded-xl border border-border/50 bg-card/50 p-6 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">{p.category}</span>
                <span className="text-xs text-muted-foreground">{p.date}</span>
              </div>
              <h2 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Blog;
