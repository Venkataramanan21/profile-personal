import './App.css';
import AchievementCard from './components/shared/AchievementCard';
import Experience from './components/shared/Experience/Experience';
import HeroTeaser from './components/shared/HeroTeaser/HeroTeaser';
import Portfolio from './components/shared/Portfolio';
import ProjectCard from './components/shared/ProjectCard';
import { achievements } from './data/achievements';
import { projects } from './data/projects';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-850 text-slate-10 relative">
  
      {/* The Grid Background Layer */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" /> */}

      {/* Your Actual Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Your Profile, Projects, Skills go here */}
          <HeroTeaser />
      {/* <Experience /> */}

      <Portfolio />
      </div>
      
    </div>
  )

  return (
    <>
      {/* <AnimatePath /> */}
<div className="min-h-screen bg-slate-50 text-slate-800">
      <HeroTeaser />
      {/* <Experience /> */}

      <Portfolio />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>


      <AchievementCard achievement={achievements} /> */}
      
    </>
  );
}

export default App;
