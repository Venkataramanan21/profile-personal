import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SiteLayout from './components/layout/SiteLayout';
import ExperiencePage from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import CaseStudyPage from './pages/CaseStudyPage';
import AboutPage from './pages/AboutPage';
import EngineeringPage from './pages/EngineeringPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import LabPage from './pages/LabPage';
import NowPage from './pages/NowPage';
import TodoPage from './pages/TodoPage';
import ExpenseTrackerPage from './pages/ExpenseTrackerPage';
import Site3DLayout from './components/layout/Site3DLayout';

const WriterGamePage = lazy(() =>
  import('./pages/WriterGamePage').then((m) => ({ default: m.WriterGamePage }))
);
const SnakeGamePage = lazy(() =>
  import('./pages/SnakeGamePage').then((m) => ({ default: m.SnakeGamePage }))
);
const LudoGamePage = lazy(() =>
  import('./pages/LudoGamePage').then((m) => ({ default: m.LudoGamePage }))
);

const GameFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-slate-500">Loading…</div>
);

const flatRoutes = (
  <>
    <Route index element={<HomePage />} />
    <Route path="projects" element={<ProjectsPage />} />
    <Route path="projects/:slug" element={<CaseStudyPage />} />
    <Route path="experience" element={<ExperiencePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="engineering" element={<EngineeringPage />} />
    <Route path="resume" element={<ResumePage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="lab" element={<LabPage />} />
    <Route path="now" element={<NowPage />} />
    <Route path="todo" element={<TodoPage />} />
    <Route path="expense-tracker" element={<ExpenseTrackerPage />} />
    <Route
      path="writer-game"
      element={
        <Suspense fallback={<GameFallback />}>
          <WriterGamePage />
        </Suspense>
      }
    />
    <Route
      path="snake-game"
      element={
        <Suspense fallback={<GameFallback />}>
          <SnakeGamePage />
        </Suspense>
      }
    />
    <Route
      path="ludo-game"
      element={
        <Suspense fallback={<GameFallback />}>
          <LudoGamePage />
        </Suspense>
      }
    />
  </>
);

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>{flatRoutes}</Route>
      <Route path="3d" element={<Site3DLayout />}>
        {flatRoutes}
      </Route>
    </Routes>
  );
}

export default App;
