import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service.js';
import { ExpenseForm } from '../expense-form/expense-form';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, ExpenseForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private expenseService = inject(ExpenseService);

  expenses = this.expenseService.allExpenses;

  balance = this.expenseService.balance;
  totalIncome = this.expenseService.totalIncome;
  totalOutcome = this.expenseService.totalExpenses;

  ngOnInit(): void {
    this.expenseService.load();
  }
}
