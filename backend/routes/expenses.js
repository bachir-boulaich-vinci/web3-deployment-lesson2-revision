var express = require("express");
const { addExpense, getAllExpenses, resetExpenses } = require("../services/expenses");
var router = express.Router();

router.get("/expenses", async function (_req, res, _next) {
  return res.json(await getAllExpenses());
});

router.post("/expenses", async function (req, res, _next) {
  const newExpense = {
    id: parseInt(Date.now().toString()),
    date: req.body.date,
    description: req.body.description,
    payer: req.body.payer,
    amount: Number(req.body.amount),
  };

  const createdExpense = await addExpense(newExpense);
  return res.json(createdExpense);
});

router.post('/expenses/reset', function(req, res, _next) {
    return res.json(resetExpenses());
});

module.exports = router;