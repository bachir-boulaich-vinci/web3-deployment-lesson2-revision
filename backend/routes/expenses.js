var express = require("express");
const { addExpense, getAllExpenses, resetExpenses } = require("../services/expenses");
var router = express.Router();

router.get("/expenses", function (_req, res, _next) {
  return res.json(getAllExpenses());
});

router.post("/expenses", function (req, res, _next) {
  const newExpense = {
    id: Date.now().toString(),
    date: req.body.date,
    description: req.body.description,
    payer: req.body.payer,
    amount: Number(req.body.amount),
  };

  addExpense(newExpense);
  return res.json(newExpense);
});

router.post('/expenses/reset', function(req, res, _next) {
    return res.json(resetExpenses());
});

module.exports = router;