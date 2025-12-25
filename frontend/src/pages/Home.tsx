import { useEffect, useState } from "react";
import { ExpenseItem } from "../components/ExpenseItem";
import type { Expense } from "../types/Expense";
import { ExpenseAdd } from "../components/ExpenseAdd";
import ExpenseSorter from "../components/ExpenseSorter";

export function Home() {
  const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [sortingAlgo, setSortingAlgo] = useState<(a: Expense, b: Expense) => number>(() => (a: Expense, b: Expense) => 0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const sortedExpenses = expenses.sort(sortingAlgo);

  const handleAlgoChange = (algo: (a: Expense, b: Expense) => number) => {
    setSortingAlgo(() => algo);
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${host}/api/expenses`);

      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );
      }

      const expenses = await response.json();
      setExpenses(expenses.sort((a: Expense, b: Expense) => Number(a.id) - Number(b.id)));
    } catch (err) {
      console.error("Fetch Expenses error: ", err);
    }
  };

  const handleAdd = (newExpense: Expense) => {
    setExpenses([...expenses, newExpense]);
  };

  const reset = async () => {
    try {
      const options = {
        method: "POST"
      };

      const response = await fetch("http://localhost:3000/api/expenses/reset", options);

      if (!response.ok) {
        throw new Error(`fetch error: ${response.status} : ${response.statusText}`);
      }

      const expenses = await response.json();

      setExpenses(expenses);
    } catch (err) {
      console.error("Reset error : ", err);
    }
  }

  return (
    <section>
      {sortedExpenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
      <ExpenseAdd handleAdd={handleAdd} />
      <button onClick={reset}>Reset</button>
      {expenses.length > 0 && <ExpenseSorter setSortingAlgo={handleAlgoChange} />}
    </section>
  );
}
