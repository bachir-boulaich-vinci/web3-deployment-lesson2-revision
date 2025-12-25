import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd(newExpense: Expense): void;
}

export function ExpenseAdd({ handleAdd }: ExpenseAddProps) {
  const onAdd = async () => {
    try {
      const today = new Date();
      const newExpense: Expense = {
        id: Date.now().toString(),
        date:
          today.getDate() +
          "/" +
          (today.getMonth() + 1) +
          "/" +
          today.getFullYear(),
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
        "http://localhost:3000/api/expenses",
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
