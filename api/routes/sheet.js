const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authJwt } = require('../middleware/auth-jwt');
const { Expense } = require('../models');
const { sequelize } = require('../models');
const { Sheet } = require('../models');
const { where } = require('sequelize');
const router = express.Router();


// ADD SHEET
// Add new sheet to db with 15 starter expenses
router.post('/add', asyncHandler(async (req, res) => {
  try {
    const newSheet = { ...req.body.sheets };
    const newRows = { ...req.body.expenses };

    let returnedSheet = null
    await sequelize.transaction(async (t) => {
      const createdSheet = await Sheet.create({
        userId: newSheet.userId,
        label: "New Sheet",
        netIncome: null
      }, { transaction: t });


      const starters = Array.from({ length: 15 }, () => ({
        name: "",
        amount: null,
        isPaid: false,
        sheetId: createdSheet.id
      }));


      newRows[0].forEach(exp => {
        exp.sheetId = createdSheet.id;
      })

      await Expense.bulkCreate(newRows[0], { transaction: t });

    });

    res.status(201).json({returnedSheet});

  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

// UPDATE
// Update sheet label
router.put("/label", authJwt, asyncHandler(async (req, res) => {
  const updatedLabel = req.body.updatedLabel;
  const sheetId = req.body.sheetId;

  await Sheet.update(
    {label: updatedLabel},
    {
      where: {id: sheetId}
    }
  );

  // if (updatedCount === 0) return res.status(404).json({ message: "Not found" });

  res.status(204).end();
}));

// update net income value
router.put("/net-income", authJwt, asyncHandler(async (req, res) => {
  const newNetIncomeValue = req.body.netIncome;
  const sheetId = req.body.sheetId;

  await Sheet.update(
    {netIncome: newNetIncomeValue},
    {
      where: {id: sheetId}
    }
  );

  // if (updatedCount === 0) return res.status(404).json({ message: "Not found" });

  res.status(204).end();
}));




// DELETE 
// Deletes expense row from db
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("INCOMING ID TO DESTROY:", id);

  await Sheet.destroy({ where: { id } });

  res.status(204).end();
}));






module.exports = router;