import type { Identifiable } from "./Core";

export interface ExpenseInput {
  date: string;       // ISO string
  description: string;
  payer: "Alice" | "Bob";
  amount: number;
}

export interface Expense extends ExpenseInput, Identifiable {}
