const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authJwt } = require('../middleware/auth-jwt');
const { Expense } = require('../models');
const { User } = require('../models');
const router = express.Router();


//GET EXPENSES 
router.get('/', authJwt, asyncHandler(async (req, res) => {
  const userId = req.currentUser.id;
  console.log("THE USER ID", userId)

    const expenses = await Expense.findAll({
      where: { userId },
      attributes: ['id', 'name', 'amount', 'isPaid', 'userId'],
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    })
    res.status(200).json(expenses);
}));

// ADD 
// Adds new expense row to db
router.post('/add', asyncHandler(async (req, res) => {
  try {
    const expense = req.body;
    await Expense.create(expense);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

// UPDATE
// Updates row inputs and saves to db
router.put("/:id", authJwt, asyncHandler(async (req, res) => {
  const userId = req.currentUser.id;
  const { id } = req.params;

  const [updatedCount] = await Expense.update(
    {
      name: req.body.name,
      amount: req.body.amount,
      isPaid: req.body.isPaid,
    },
    { where: { id, userId } }
  );

  if (updatedCount === 0) return res.status(404).json({ message: "Not found" });

  res.status(204).end();
}));



// DELETE 
// Deletes expense row from db
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Expense.destroy({ where: { id } });

  res.status(204).end();
}));






module.exports = router;