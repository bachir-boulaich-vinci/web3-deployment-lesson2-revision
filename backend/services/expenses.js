const path = require("path");
const { parse, serialize } = require("../utils/json");
const jsonDbPath = path.join(__dirname, "/../data/expenses.json");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function getAllExpenses() {
  const expenses = await prisma.expense.findMany();
  return expenses;
}

async function addExpense(expense) {
  await prisma.expense.create({
    data: expense
  });
}

function resetExpenses() {
    const jsonDbPathInit = path.join(__dirname, "/../data/expenses.init.json");
    const expenses = parse(jsonDbPathInit);
    serialize(jsonDbPath, expenses);
    return expenses;
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
