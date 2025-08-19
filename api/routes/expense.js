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





module.exports = router;