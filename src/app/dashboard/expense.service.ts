import { computed, Injectable, signal } from '@angular/core';
import { Expense } from './Expense.model.js';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expenses = signal<Expense[]>([]);

  allExpenses = this.expenses.asReadonly();
  // totalIncome
  totalIncome = computed(() =>
    this.expenses()
      .filter((e) => e.category === 'Income')
      .reduce((sum, a) => sum + a.amount, 0),
  );
  // totalExpenses
  totalExpenses = computed(() =>
    this.expenses()
      .filter((e) => e.category !== 'Income')
      .reduce((sum, e) => sum + e.amount, 0),
  );

  balance = computed(() => this.totalIncome() - this.totalExpenses());

  addExpense(expense: Expense) {
    this.expenses.update((allExpenses) => [...allExpenses, expense]);
    this.saveToLocal();
  }

  deleteExpense(id: string) {
    this.expenses.update((allExp) => allExp.filter((exp) => exp.id !== id));
    this.saveToLocal();
  }

  private saveToLocal() {
    localStorage.setItem('expenses-item', JSON.stringify(this.expenses()));
  }

  load() {
    const saved = localStorage.getItem('expenses-item');
    if (!saved) return;

    this.expenses.set(JSON.parse(saved));
  }
}
