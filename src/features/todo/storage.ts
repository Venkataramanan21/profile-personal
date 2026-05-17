import {
  isTodoStatus,
  parseOptionalYmd,
  type TodoItem,
  type TodoStatus,
} from './types';

export const TODO_STORAGE_KEY = 'portfolio.todo.tasks';

interface LegacyTodoItem {
  id?: unknown;
  text?: unknown;
  completed?: unknown;
  createdAt?: unknown;
}

function migrateLegacyStatus(completed: boolean): TodoStatus {
  return completed ? 'done' : 'todo';
}

export function coerceTodoItem(raw: unknown): TodoItem | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const item = raw as LegacyTodoItem & {
    status?: unknown;
    startDate?: unknown;
    dueDate?: unknown;
  };

  const id = item.id;
  const text = item.text;
  const createdAt = item.createdAt;

  if (typeof id !== 'string' || typeof text !== 'string' || typeof createdAt !== 'number') {
    return null;
  }

  const startDate = parseOptionalYmd(item.startDate);
  const dueDate = parseOptionalYmd(item.dueDate);

  if (isTodoStatus(item.status)) {
    return { id, text, createdAt, status: item.status, startDate, dueDate };
  }

  if (typeof item.completed === 'boolean') {
    return {
      id,
      text,
      createdAt,
      status: migrateLegacyStatus(item.completed),
      startDate,
      dueDate,
    };
  }

  return null;
}

export function readStoredTodos(): TodoItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const migrated = parsed
      .map((entry) => coerceTodoItem(entry))
      .filter((entry): entry is TodoItem => entry !== null);

    return migrated;
  } catch {
    return [];
  }
}

export function writeTodos(tasks: TodoItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(tasks));
}

const TODO_EXPORT_FORMAT_VERSION = 1;

export interface TodoExportEnvelope {
  version: typeof TODO_EXPORT_FORMAT_VERSION;
  exportedAt: string;
  tasks: TodoItem[];
}

export function parseTodoImportPayload(parsed: unknown): TodoItem[] {
  if (Array.isArray(parsed)) {
    return parsed.map((entry) => coerceTodoItem(entry)).filter((item): item is TodoItem => item !== null);
  }

  if (
    parsed &&
    typeof parsed === 'object' &&
    'tasks' in parsed &&
    Array.isArray((parsed as TodoExportEnvelope).tasks)
  ) {
    return (parsed as TodoExportEnvelope).tasks
      .map((entry) => coerceTodoItem(entry))
      .filter((item): item is TodoItem => item !== null);
  }

  return [];
}

function isRecognizedImportShape(parsed: unknown): boolean {
  if (Array.isArray(parsed)) {
    return true;
  }
  return Boolean(
    parsed &&
      typeof parsed === 'object' &&
      'tasks' in parsed &&
      Array.isArray((parsed as { tasks: unknown }).tasks)
  );
}

/** Locate first JSON object or array in a text file (allows # comment lines at the top). */
function sliceFirstJsonValue(text: string): string {
  const trimmed = text.trim();
  const brace = trimmed.indexOf('{');
  const bracket = trimmed.indexOf('[');
  const candidates = [brace, bracket].filter((index) => index >= 0);
  if (candidates.length === 0) {
    return trimmed;
  }
  const start = Math.min(...candidates);
  return trimmed.slice(start);
}

export function parseTodoFileText(fileText: string):
  | { ok: true; tasks: TodoItem[] }
  | { ok: false; message: string } {
  try {
    const jsonSlice = sliceFirstJsonValue(fileText);
    const parsed: unknown = JSON.parse(jsonSlice);
    if (!isRecognizedImportShape(parsed)) {
      return {
        ok: false,
        message:
          'This file does not look like a todo backup. Expected a JSON array of tasks, or an object with a "tasks" array.',
      };
    }
    const tasks = parseTodoImportPayload(parsed);
    return { ok: true, tasks };
  } catch {
    return {
      ok: false,
      message:
        'Could not read this file. Use a .txt backup exported from this page, or JSON: either an array of tasks or an object with a "tasks" array.',
    };
  }
}

export function buildTodoBackupFileContent(tasks: TodoItem[]): string {
  const envelope: TodoExportEnvelope = {
    version: TODO_EXPORT_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    tasks,
  };

  const header = [
    '# Portfolio todo backup (plain text)',
    '# Import: open /todo and choose "Import from file".',
    '# Data below is JSON.',
    '',
  ].join('\n');

  return `${header}${JSON.stringify(envelope, null, 2)}\n`;
}

export function suggestedTodoBackupFilename(): string {
  const day = new Date().toISOString().slice(0, 10);
  return `portfolio-todos-${day}.txt`;
}
