import { Route, Routes } from 'react-router-dom';
import './App.css';
import ThemeToggle from './components/shared/ThemeToggle';
import ExperiencePage from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { LudoGamePage } from './pages/LudoGamePage';
import { SnakeGamePage } from './pages/SnakeGamePage';
import { WriterGamePage } from './pages/WriterGamePage';

function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/writer-game" element={<WriterGamePage />} />
      <Route path="/snake-game" element={<SnakeGamePage />} />
      <Route path="/ludo-game" element={<LudoGamePage />} />
      </Routes>
    </>
  );
}

export default App;
