import type { TodoStatus } from './types';

/** Today's date in the user's local calendar as `YYYY-MM-DD`. */
export function getTodayYmd(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Lexicographic compare works for ISO date strings. */
export function isYmdBeforeToday(ymd: string, todayYmd: string): boolean {
  return ymd.localeCompare(todayYmd) < 0;
}

export function isYmdAfterToday(ymd: string, todayYmd: string): boolean {
  return ymd.localeCompare(todayYmd) > 0;
}

/** Overdue: has due date before today and not finished. Blocked still counts as overdue if past due. */
export function isTaskOverdue(
  dueDate: string | null,
  status: TodoStatus,
  todayYmd: string
): boolean {
  if (status === 'done' || !dueDate) {
    return false;
  }
  return isYmdBeforeToday(dueDate, todayYmd);
}

/** Not started: start date is in the future. */
export function isTaskNotStarted(startDate: string | null, todayYmd: string): boolean {
  if (!startDate) {
    return false;
  }
  return isYmdAfterToday(startDate, todayYmd);
}
