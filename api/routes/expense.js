const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { Expense } = require('../models/expense');

const router = express.Router();

//GET EXPENSES 
router.get('/', asyncHandler(async (req, res) => {
    const expenses = await Expense.findAll({
      attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'emailAddress']
      }]
    })

    res.status(200).json(courses);
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