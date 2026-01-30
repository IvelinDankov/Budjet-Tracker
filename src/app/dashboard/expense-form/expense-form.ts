import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service.js';
import { Expense } from '../Expense.model.js';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseForm {
  @Input() editingExpense: Expense | null = null;
  @Output() expenseAdded = new EventEmitter<Expense>();

  private expenseService = inject(ExpenseService);
  editingId: string | null = null;

  form = new FormGroup({
    sum: new FormControl('0', {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01)],
    }),
    type: new FormControl('Income', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', { nonNullable: true }),
  });

  onSubmitForm() {
    if (this.form.invalid) return;

    const formData = this.form.getRawValue();
    const enteredAmount = Number(formData.sum);
    const category = formData.type as 'Income' | 'Food' | 'Housing' | 'Utilities' | 'Other';

    if (this.editingExpense) {
      const updateExpense = {
        id: this.editingExpense.id,
        description: formData.description || this.editingExpense.description,
        amount: enteredAmount,
        category: category,
        date: this.editingExpense.date,
      };
      this.expenseAdded.emit(updateExpense);
    } else {
      const newExpense: Expense = {
        id: uuidv4(),
        description: '',
        amount: enteredAmount,
        category: category as 'Income' | 'Food' | 'Housing' | 'Utilities' | 'Other',
        date: new Date().toISOString().split('T')[0],
      };
      this.expenseService.addExpense(newExpense);
    }

    this.form.reset();
  }

  onEditForm(expense: Expense) {
    this.editingId = expense.id;
    this.editingExpense = expense;
    this.form.patchValue({
      description: expense.description,
      sum: expense.amount.toString(),
      type: expense.category,
    });
  }

  resetForm() {
    this.form.reset({
      sum: '0',
      type: 'Income',
      description: '',
    });
    this.editingId = null;
    this.editingExpense = null;
  }
}
