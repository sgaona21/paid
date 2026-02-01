const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authJwt } = require('../middleware/auth-jwt');
const { Expense } = require('../models');
const { User } = require('../models');

const router = express.Router();

//ADD STARTER ROWS
router.post('/seed', authJwt, asyncHandler(async (req, res) => {
  const userId = req.currentUser.id;

  const expenses = await Expense.sequelize.transaction(async (t) => {
    const count = await Expense.count({
      where: { userId },
      transaction: t
    });

    if (count === 0) {
      const starters = [
        { userId, name: 'Rent', amount: 0, isPaid: false },
        { userId, name: 'Car Payment', amount: 0, isPaid: false },
        // ... 8 more
      ];

      await Expense.bulkCreate(starters, { transaction: t });
    }

    return Expense.findAll({
      where: { userId },
      attributes: ['id', 'name', 'amount', 'isPaid', 'userId'],
      order: [['createdAt', 'ASC']],
      transaction: t
    });
  });

  res.status(200).json(expenses);
}));


//GET EXPENSES 
router.get('/', authJwt, asyncHandler(async (req, res) => {
  const userId = req.currentUser.userId;

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

//ADD STARTER ROWS TO DB
router.post('/starters', asyncHandler(async (req, res) => {
  try {
    const starters = req.body;
    console.log("body:", starters)
    await Expense.bulkCreate(starters);
    res.status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      console.log("ERRORS", errors)
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

//Add new expense
router.post('/add', asyncHandler(async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    // res.location(`/api/courses/${course.id}`);
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