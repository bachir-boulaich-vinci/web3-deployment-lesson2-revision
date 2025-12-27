import { z } from "zod";

export const expenseSchema = z.object({
  payer: z.enum(["Bob", "Alice"], {
    message: "Payer must be Bob or Alice",
  }),

  date: z.string().date({ message: "Invalid date format" }),

  amount: z
    .number({
      message: "Amount must be a number",
    })
    .positive("Amount must be a positive number"),

  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

