import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const labItems = [
  {
    title: 'Typewriter Game',
    path: '/writer-game',
    description: 'Typing accuracy and speed practice — timer starts on first keystroke.',
  },
  {
    title: 'Snake Game',
    path: '/snake-game',
    description: 'Classic snake with keyboard controls — exercises game loop and state updates.',
  },
  {
    title: 'Ludo Game',
    path: '/ludo-game',
    description: 'Board game UI with dice rolls and turn logic — component composition practice.',
  },
];

const LabPage = () => {
  usePageTitle('Lab');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="Lab"
        description="Side projects and small interactive demos — not part of the main interview path, but fun to explore."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="Playground"
      />

      <div className="mb-6 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        <Gamepad2 size={18} />
        For interviews, start with Work and Experience from the main nav.
      </div>

      <ul className="space-y-4">
        {labItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-teal-600"
            >
              <h2 className="mb-1 font-bold text-slate-900 dark:text-white">{item.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabPage;
