import './App.css';
import Footer from './components/shared/Footer';
import HeroTeaser from './components/shared/HeroTeaser/HeroTeaser';
import Portfolio from './components/shared/Portfolio';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 relative">

      {/* Your Actual Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Your Profile, Projects, Skills go here */}
          <HeroTeaser />
      {/* <Experience /> */}

      <Portfolio />
      </div>
      
      <Footer/>
    </div>
  )
}

export default App;
