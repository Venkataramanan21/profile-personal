import { nowContent } from '../content/now';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';

const NowPage = () => {
  usePageTitle('Now');

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="Now"
        description={`What I'm focused on — last updated ${nowContent.updated}.`}
        backTo={{ label: 'Back to home', path: '/' }}
      />

      <ul className="space-y-6">
        {nowContent.items.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/80"
          >
            <h2 className="mb-2 font-bold text-slate-900 dark:text-white">{item.title}</h2>
            <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NowPage;
