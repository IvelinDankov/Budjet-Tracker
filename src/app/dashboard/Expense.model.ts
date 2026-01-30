export interface Expense {
  id: string,
  description: string;
  amount: number;
  category: 'Income' | 'Food' | 'Housing' | 'Utilities' | 'Other',
  date: string
}

