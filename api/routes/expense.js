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

//Add new expense
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





module.exports = router;