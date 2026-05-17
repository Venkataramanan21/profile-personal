import Footer from '../components/shared/Footer';
import HeroTeaser from '../components/shared/HeroTeaser/HeroTeaser';
import Portfolio from '../components/shared/Portfolio';

export function HomePage() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 relative">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <HeroTeaser />
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
}
