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
    console.log('BUUUUUT DID WE MAKE IT HERE')
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


// DELETE 
// Deletes expense row from db
router.delete('/:id', asyncHandler(async (req, res) => {
  const userId = req.currentUser.id;
  const expenseId = req.params.id;

  const deleted = await Expense.destroy({
    where: { id: expenseId, userId }
  });
  console.log('ROW YEEETED')
  if (!deleted) return res.status(404).json({ message: "Not found" });
  res.status(204).end();
}));





module.exports = router;