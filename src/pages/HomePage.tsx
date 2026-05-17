import HeroTeaser from '../components/shared/HeroTeaser/HeroTeaser';
import InterviewerGuide from '../components/shared/InterviewerGuide';
import Portfolio from '../components/shared/Portfolio';
import { usePageTitle } from '../hooks/usePageTitle';

export function HomePage() {
  usePageTitle();

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        <HeroTeaser />
        <InterviewerGuide />
        <Portfolio />
      </div>
    </div>
  );
}
