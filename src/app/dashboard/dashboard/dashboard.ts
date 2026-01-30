import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { ExpenseService } from '../expense.service.js';
import { ExpenseForm } from '../expense-form/expense-form';
import { Expense } from '../Expense.model.js';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, ExpenseForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {  
  editingExpense: Expense | null = null
  @ViewChild(ExpenseForm) expenseForm!: ExpenseForm;
  private expenseService = inject(ExpenseService);

  expenses = this.expenseService.allExpenses;

  balance = this.expenseService.balance;
  totalIncome = this.expenseService.totalIncome;
  totalOutcome = this.expenseService.totalExpenses;

  ngOnInit(): void {
    this.expenseService.load();
  }

  onAdded(expense: Expense) {
    if (this.expenseService.getExpenseById(expense.id)) {
      this.expenseService.updateExpense(expense.id, expense);
    } else {
      this.expenseService.addExpense(expense);
    }

    this.expenseForm.onEditForm(expense);
  }

  onDeleteForm(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
