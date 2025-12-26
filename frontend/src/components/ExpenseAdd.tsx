import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd(newExpense: Expense): void;
}

export function ExpenseAdd({ handleAdd }: ExpenseAddProps) {
  const onAdd = async () => {
      const host = import.meta.env.VITE_API_URL || 'http://unknown-api-url.com';
    try {
      const today = new Date();
      const newExpense: Expense = {
        date: new Date().toISOString(),
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, atque, blanditiis quas quos numquam perspiciatis cupiditate fugit vel veritatis voluptas facilis! Amet sed repudiandae aspernatur reprehenderit, tempore expedita quisquam molestias.",
        payer: ["Alice", "Bob"][Math.floor(Math.random() * 2)],
        amount: Number((Math.random() * 101).toFixed(2)),
      };

      const options = {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `${host}/api/expenses`,
        options
      );

      if (!response.ok) {
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );
      }

      const createdExpense = await response.json();

      handleAdd(createdExpense);
    } catch (err) {
      console.error("Post expense error : ", err);
    }
  };

  return <button onClick={onAdd}>Add</button>;
}
