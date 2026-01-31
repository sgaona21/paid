const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Expense } = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');


const router = express.Router();

//GET EXPENSES 
router.get('/', asyncHandler(async (req, res) => {
    const expenses = await Expense.findAll({
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