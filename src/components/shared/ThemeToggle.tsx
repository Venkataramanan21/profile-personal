import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="fixed top-4 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/45 text-slate-800 shadow-lg backdrop-blur-xl transition hover:scale-105 hover:border-teal-500/60 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:border-slate-500/40 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-teal-400/60 dark:hover:text-teal-300"
    >
      {isDark ? <Sun size={20} aria-hidden /> : <Moon size={20} aria-hidden />}
    </button>
  );
};

export default ThemeToggle;
