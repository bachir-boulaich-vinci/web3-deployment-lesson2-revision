const path = require("path");
const { parse, serialize } = require("../utils/json");
const jsonDbPath = path.join(__dirname, "/../data/expenses.json");

function getAllExpenses() {
  return parse(jsonDbPath);
}

function addExpense(expense) {
  const expenses = getAllExpenses();
  serialize(jsonDbPath, [...expenses, expense]);
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
