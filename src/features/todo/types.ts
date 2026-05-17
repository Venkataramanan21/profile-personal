export const TODO_STATUSES = [
  'todo',
  'in_progress',
  'in_review',
  'done',
  'blocked',
] as const;

export type TodoStatus = (typeof TODO_STATUSES)[number];

export interface TodoItem {
  id: string;
  text: string;
  createdAt: number;
  status: TodoStatus;
  /** Local calendar date `YYYY-MM-DD` */
  startDate: string | null;
  /** Local calendar date `YYYY-MM-DD` */
  dueDate: string | null;
}

/** UI labels aligned with Jira-like workflow */
export const TODO_STATUS_LABELS: Record<TodoStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
  blocked: 'Blocked',
};

const YMD_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function isValidYmd(value: unknown): value is string {
  return typeof value === 'string' && YMD_REGEX.test(value);
}

export function parseOptionalYmd(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return isValidYmd(value) ? value : null;
}

export function isTodoStatus(value: unknown): value is TodoStatus {
  return typeof value === 'string' && (TODO_STATUSES as readonly string[]).includes(value);
}
