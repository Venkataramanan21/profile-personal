import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Download, Receipt, Trash2, Upload } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CURRENCIES,
  buildExpenseBackupFileContent,
  formatMoney,
  parseExpenseFileText,
  readStoredExpenses,
  suggestedExpenseBackupFilename,
  totalsByCurrency,
  writeExpenses,
  type ExpenseCategory,
  type ExpenseCurrencyCode,
  type ExpenseEntry,
} from '../features/expense-tracker';

const DEFAULT_CURRENCY: ExpenseCurrencyCode = 'INR';

const ExpenseTrackerPage = () => {
  usePageTitle('Expense tracker');

  const [entries, setEntries] = useState<ExpenseEntry[]>(() =>
    [...readStoredExpenses()].sort((a, b) => b.createdAt - a.createdAt)
  );

  const [amountDraft, setAmountDraft] = useState('');
  const [descriptionDraft, setDescriptionDraft] = useState('');
  const [currencyDraft, setCurrencyDraft] = useState<ExpenseCurrencyCode>(DEFAULT_CURRENCY);
  const [categoryDraft, setCategoryDraft] = useState<ExpenseCategory>('Other');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    writeExpenses(entries);
  }, [entries]);

  const totals = useMemo(() => totalsByCurrency(entries), [entries]);

  const sortedTotalRows = useMemo(() => {
    const codes = Object.keys(totals);
    codes.sort((a, b) => {
      if (a === 'INR') {
        return -1;
      }
      if (b === 'INR') {
        return 1;
      }
      return a.localeCompare(b);
    });
    return codes.map((code) => ({
      code,
      sum: totals[code] ?? 0,
    }));
  }, [totals]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number.parseFloat(amountDraft.replace(/,/g, ''));

    if (!Number.isFinite(amount) || amount <= 0) {
      window.alert('Enter a positive amount.');
      return;
    }

    const next: ExpenseEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      amount,
      currency: currencyDraft,
      description: descriptionDraft.trim() || 'Expense',
      category: categoryDraft,
      createdAt: Date.now(),
    };

    setEntries((prev) => [next, ...prev].sort((a, b) => b.createdAt - a.createdAt));
    setAmountDraft('');
    setDescriptionDraft('');
    setCategoryDraft('Other');
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const downloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = 'noopener';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadBackup = () => {
    const body = buildExpenseBackupFileContent(entries);
    downloadTextFile(suggestedExpenseBackupFilename(), body);
  };

  const handleImportFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const result = parseExpenseFileText(text);

      if (!result.ok) {
        window.alert(result.message);
        return;
      }

      const replace = window.confirm(
        'Replace all current expenses with the imported list? Export a backup first if you need a copy of what you have now.'
      );

      if (!replace) {
        return;
      }

      setEntries([...result.entries].sort((a, b) => b.createdAt - a.createdAt));
    } catch {
      window.alert('Could not read the selected file.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="Expense tracker"
        description="Log spending in INR or other major currencies. Data stays in this browser — download a text backup anytime or restore from a file, same as Todo."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="Finance"
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="expense-amount"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Amount
              </label>
              <input
                id="expense-amount"
                inputMode="decimal"
                value={amountDraft}
                onChange={(event) => setAmountDraft(event.target.value)}
                placeholder="0.00"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="expense-currency"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Currency
              </label>
              <select
                id="expense-currency"
                value={currencyDraft}
                onChange={(event) =>
                  setCurrencyDraft(event.target.value as ExpenseCurrencyCode)
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              >
                {EXPENSE_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="expense-description"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Description
              </label>
              <input
                id="expense-description"
                value={descriptionDraft}
                onChange={(event) => setDescriptionDraft(event.target.value)}
                placeholder="Coffee, taxi, subscription…"
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="expense-category"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Category
              </label>
              <select
                id="expense-category"
                value={categoryDraft}
                onChange={(event) =>
                  setCategoryDraft(event.target.value as ExpenseCategory)
                }
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
          >
            Add expense
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
            Entries: <strong>{entries.length}</strong>
          </span>
          {sortedTotalRows.map(({ code, sum }) => (
            <span
              key={code}
              className="rounded-full bg-teal-100 px-3 py-1 font-medium text-teal-950 dark:bg-teal-900/35 dark:text-teal-100"
            >
              Total ({code}): <strong>{formatMoney(sum, code)}</strong>
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Backup</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Download expenses as a plain-text file (JSON inside), or import a file you exported here to
            restore on this device or another browser.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Download size={18} aria-hidden />
              Download backup (.txt)
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Upload size={18} aria-hidden />
              Import from file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.json,text/plain"
              className="hidden"
              onChange={handleImportFileChange}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        {entries.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <Receipt size={18} />
            No expenses yet. Add one above.
          </div>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900/80"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatMoney(entry.amount, entry.currency)}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {entry.currency}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {entry.category}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-800 dark:text-slate-100">
                  {entry.description}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(entry.createdAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(entry.id)}
                className="shrink-0 self-end rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 dark:text-slate-300 dark:hover:bg-rose-950/30 dark:hover:text-rose-300 sm:self-center"
                aria-label="Delete expense"
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default ExpenseTrackerPage;
