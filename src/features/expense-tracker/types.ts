/** ISO 4217 codes supported in the picker */
export const EXPENSE_CURRENCIES = [
  { code: 'INR', label: 'Indian rupee (₹)' },
  { code: 'USD', label: 'US dollar ($)' },
  { code: 'EUR', label: 'Euro (€)' },
  { code: 'GBP', label: 'British pound (£)' },
  { code: 'JPY', label: 'Japanese yen (¥)' },
  { code: 'AUD', label: 'Australian dollar (A$)' },
  { code: 'CAD', label: 'Canadian dollar (C$)' },
  { code: 'CHF', label: 'Swiss franc (CHF)' },
  { code: 'CNY', label: 'Chinese yuan (¥)' },
  { code: 'SGD', label: 'Singapore dollar (S$)' },
  { code: 'AED', label: 'UAE dirham (د.إ)' },
  { code: 'NZD', label: 'New Zealand dollar (NZ$)' },
  { code: 'HKD', label: 'Hong Kong dollar (HK$)' },
  { code: 'SEK', label: 'Swedish krona (kr)' },
  { code: 'ZAR', label: 'South African rand (R)' },
] as const;

export type ExpenseCurrencyCode = (typeof EXPENSE_CURRENCIES)[number]['code'];

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Health',
  'Entertainment',
  'Other',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface ExpenseEntry {
  id: string;
  /** Positive amount in the chosen currency */
  amount: number;
  currency: ExpenseCurrencyCode;
  description: string;
  category: ExpenseCategory;
  createdAt: number;
}
