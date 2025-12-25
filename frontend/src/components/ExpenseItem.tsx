import type { Expense } from "../types/Expense";

interface ExpenseItemProps {
    expense: Expense
}

export function ExpenseItem({ expense } : ExpenseItemProps) {
    return (
        <div>
            <h2>{expense.date}</h2>
            <p>{expense.description}</p>
            <p>{expense.amount}€</p>
            <p>{expense.payer}</p>
        </div>
    )
}