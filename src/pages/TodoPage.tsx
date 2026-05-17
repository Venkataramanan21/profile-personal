import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Download, ListTodo, Trash2, Upload } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import {
  TODO_STATUSES,
  TODO_STATUS_LABELS,
  buildTodoBackupFileContent,
  getTodayYmd,
  isTaskNotStarted,
  isTaskOverdue,
  isTodoStatus,
  parseTodoFileText,
  readStoredTodos,
  suggestedTodoBackupFilename,
  writeTodos,
  type TodoItem,
  type TodoStatus,
} from '../features/todo';

const TodoPage = () => {
  usePageTitle('Todo');

  const [tasks, setTasks] = useState<TodoItem[]>(readStoredTodos);
  const [draft, setDraft] = useState('');
  const [draftStartDate, setDraftStartDate] = useState('');
  const [draftDueDate, setDraftDueDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const todayYmd = getTodayYmd();

  useEffect(() => {
    writeTodos(tasks);
  }, [tasks]);

  const { activeCount, doneCount, overdueCount } = useMemo(() => {
    let active = 0;
    let done = 0;
    let overdue = 0;

    for (const task of tasks) {
      if (task.status === 'done') {
        done += 1;
      } else {
        active += 1;
      }
      if (isTaskOverdue(task.dueDate, task.status, todayYmd)) {
        overdue += 1;
      }
    }

    return { activeCount: active, doneCount: done, overdueCount: overdue };
  }, [tasks, todayYmd]);

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();

    if (!text) {
      return;
    }

    const newTask: TodoItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      createdAt: Date.now(),
      status: 'todo',
      startDate: draftStartDate.trim() || null,
      dueDate: draftDueDate.trim() || null,
    };

    setTasks((prev) => [newTask, ...prev]);
    setDraft('');
    setDraftStartDate('');
    setDraftDueDate('');
  };

  const handleStatusChange = (taskId: string, status: TodoStatus) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)));
  };

  const handleStartDateChange = (taskId: string, value: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, startDate: value.trim() || null } : task
      )
    );
  };

  const handleDueDateChange = (taskId: string, value: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, dueDate: value.trim() || null } : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
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
    const body = buildTodoBackupFileContent(tasks);
    downloadTextFile(suggestedTodoBackupFilename(), body);
  };

  const handleImportFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const result = parseTodoFileText(text);

      if (!result.ok) {
        window.alert(result.message);
        return;
      }

      const replace = window.confirm(
        'Replace all current tasks with the imported list? You can export a backup first if you need a copy of what you have now.'
      );

      if (!replace) {
        return;
      }

      setTasks(result.tasks);
    } catch {
      window.alert('Could not read the selected file.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader
        title="Todo"
        description="Track personal tasks locally in this browser. Set start and due dates, move items through workflow statuses, and download a text backup to restore later."
        backTo={{ label: 'Back to home', path: '/' }}
        eyebrow="Productivity"
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
        <form onSubmit={handleAddTask} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="todo-input" className="sr-only">
              New task
            </label>
            <input
              id="todo-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Add a task..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700"
            >
              Add task
            </button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="todo-start-draft"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Start (optional)
              </label>
              <input
                id="todo-start-draft"
                type="date"
                value={draftStartDate}
                onChange={(event) => setDraftStartDate(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <label
                htmlFor="todo-due-draft"
                className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >
                Due (optional)
              </label>
              <input
                id="todo-due-draft"
                type="date"
                value={draftDueDate}
                onChange={(event) => setDraftDueDate(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
              />
            </div>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
            Total: <strong>{tasks.length}</strong>
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300">
            Active: <strong>{activeCount}</strong>
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300">
            Done: <strong>{doneCount}</strong>
          </span>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-900 dark:bg-rose-900/30 dark:text-rose-300">
            Overdue: <strong>{overdueCount}</strong>
          </span>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Backup</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Download your list as a plain-text file (JSON inside) for safekeeping, or import a file you exported
            here to restore on this device or another browser.
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
        {tasks.length === 0 ? (
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <ListTodo size={18} />
            No tasks yet. Add your first one above.
          </div>
        ) : (
          tasks.map((task) => {
            const overdue = isTaskOverdue(task.dueDate, task.status, todayYmd);
            const notStarted = isTaskNotStarted(task.startDate, todayYmd);
            const isDone = task.status === 'done';

            return (
              <article
                key={task.id}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/80"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={`text-sm font-medium sm:text-base ${
                          isDone
                            ? 'text-slate-400 line-through dark:text-slate-500'
                            : 'text-slate-800 dark:text-slate-100'
                        }`}
                      >
                        {task.text}
                      </h2>
                      {overdue ? (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-900 dark:bg-rose-900/40 dark:text-rose-200">
                          Overdue
                        </span>
                      ) : null}
                      {notStarted ? (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                          Not started
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <label className="flex min-w-[140px] flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                        Start
                        <input
                          type="date"
                          value={task.startDate ?? ''}
                          onChange={(event) => handleStartDateChange(task.id, event.target.value)}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
                        />
                      </label>
                      <label className="flex min-w-[140px] flex-col gap-1 text-xs text-slate-500 dark:text-slate-400">
                        Due
                        <input
                          type="date"
                          value={task.dueDate ?? ''}
                          onChange={(event) => handleDueDateChange(task.id, event.target.value)}
                          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                    <label className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 sm:items-end">
                      Status
                      <select
                        value={task.status}
                        onChange={(event) => {
                          const value = event.target.value;
                          if (isTodoStatus(value)) {
                            handleStatusChange(task.id, value);
                          }
                        }}
                        className="w-full min-w-[10.5rem] rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-200 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-teal-900 sm:w-auto"
                      >
                        {TODO_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {TODO_STATUS_LABELS[status]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      className="self-end rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 dark:text-slate-300 dark:hover:bg-rose-950/30 dark:hover:text-rose-300"
                      aria-label="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};

export default TodoPage;
