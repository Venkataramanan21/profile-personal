import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExperiencePage from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { WriterGamePage } from './pages/WriterGamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/writer-game" element={<WriterGamePage />} />
    </Routes>
  );
}

export default App;
