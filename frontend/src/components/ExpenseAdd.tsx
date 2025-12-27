import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseSchema,
  type ExpenseFormData,
} from "../schemas/ExpenseAdd.schema";
import type { Expense } from "../types/Expense";

interface ExpenseAddProps {
  handleAdd(newExpense: Expense): void;
}

export function ExpenseAdd({ handleAdd }: ExpenseAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormData) => {
    const host = import.meta.env.VITE_API_URL;

    const response = await fetch(`${host}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const createdExpense: Expense = await response.json();
    handleAdd(createdExpense);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Payer:
        <select {...register("payer")}>
          <option value="">Select payer</option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <span>{errors.payer.message}</span>}
      </label>

      <label>
        Date:
        <input type="date" {...register("date")} />
        {errors.date && <span>{errors.date.message}</span>}
      </label>

      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </label>

      <label>
        Description:
        <textarea {...register("description")} />
        {errors.description && <span>{errors.description.message}</span>}
      </label>

      <button type="submit">Add expense</button>
    </form>
  );
}
