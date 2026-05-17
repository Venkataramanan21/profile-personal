import {
  EXPENSE_CATEGORIES,
  EXPENSE_CURRENCIES,
  type ExpenseCategory,
  type ExpenseCurrencyCode,
  type ExpenseEntry,
} from './types';

export const EXPENSE_STORAGE_KEY = 'portfolio.expense-tracker.entries';

const currencyCodes = new Set<string>(EXPENSE_CURRENCIES.map((c) => c.code));

function isExpenseCurrencyCode(value: unknown): value is ExpenseCurrencyCode {
  return typeof value === 'string' && currencyCodes.has(value);
}

function isExpenseCategory(value: unknown): value is ExpenseCategory {
  return typeof value === 'string' && (EXPENSE_CATEGORIES as readonly string[]).includes(value);
}

export function coerceExpense(raw: unknown): ExpenseEntry | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const row = raw as Record<string, unknown>;
  const id = row.id;
  const amount = row.amount;
  const currency = row.currency;
  const description = row.description;
  const category = row.category;
  const createdAt = row.createdAt;

  if (
    typeof id !== 'string' ||
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    typeof description !== 'string' ||
    typeof createdAt !== 'number'
  ) {
    return null;
  }

  if (!isExpenseCurrencyCode(currency)) {
    return null;
  }

  const cat: ExpenseCategory = isExpenseCategory(category) ? category : 'Other';

  return {
    id,
    amount,
    currency,
    description: description.trim() || 'Expense',
    category: cat,
    createdAt,
  };
}

export function readStoredExpenses(): ExpenseEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(EXPENSE_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((entry) => coerceExpense(entry)).filter((e): e is ExpenseEntry => e !== null);
  } catch {
    return [];
  }
}

export function writeExpenses(entries: ExpenseEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(entries));
}

export function totalsByCurrency(entries: ExpenseEntry[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const e of entries) {
    map[e.currency] = (map[e.currency] ?? 0) + e.amount;
  }
  return map;
}

const EXPENSE_EXPORT_FORMAT_VERSION = 1;

export interface ExpenseExportEnvelope {
  version: typeof EXPENSE_EXPORT_FORMAT_VERSION;
  exportedAt: string;
  entries: ExpenseEntry[];
}

export function parseExpenseImportPayload(parsed: unknown): ExpenseEntry[] {
  if (Array.isArray(parsed)) {
    return parsed.map((entry) => coerceExpense(entry)).filter((item): item is ExpenseEntry => item !== null);
  }

  if (
    parsed &&
    typeof parsed === 'object' &&
    'entries' in parsed &&
    Array.isArray((parsed as ExpenseExportEnvelope).entries)
  ) {
    return (parsed as ExpenseExportEnvelope).entries
      .map((entry) => coerceExpense(entry))
      .filter((item): item is ExpenseEntry => item !== null);
  }

  return [];
}

function isRecognizedExpenseImportShape(parsed: unknown): boolean {
  if (Array.isArray(parsed)) {
    return true;
  }
  return Boolean(
    parsed &&
      typeof parsed === 'object' &&
      'entries' in parsed &&
      Array.isArray((parsed as { entries: unknown }).entries)
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

export function parseExpenseFileText(fileText: string):
  | { ok: true; entries: ExpenseEntry[] }
  | { ok: false; message: string } {
  try {
    const jsonSlice = sliceFirstJsonValue(fileText);
    const parsed: unknown = JSON.parse(jsonSlice);
    if (!isRecognizedExpenseImportShape(parsed)) {
      return {
        ok: false,
        message:
          'This file does not look like an expense backup. Expected a JSON array of expenses, or an object with an "entries" array.',
      };
    }
    const entries = parseExpenseImportPayload(parsed);
    return { ok: true, entries };
  } catch {
    return {
      ok: false,
      message:
        'Could not read this file. Use a .txt backup exported from this page, or JSON: either an array of expenses or an object with an "entries" array.',
    };
  }
}

export function buildExpenseBackupFileContent(entries: ExpenseEntry[]): string {
  const envelope: ExpenseExportEnvelope = {
    version: EXPENSE_EXPORT_FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    entries,
  };

  const header = [
    '# Portfolio expense tracker backup (plain text)',
    '# Import: open /expense-tracker and choose "Import from file".',
    '# Data below is JSON.',
    '',
  ].join('\n');

  return `${header}${JSON.stringify(envelope, null, 2)}\n`;
}

export function suggestedExpenseBackupFilename(): string {
  const day = new Date().toISOString().slice(0, 10);
  return `portfolio-expenses-${day}.txt`;
}
