const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authJwt } = require('../middleware/auth-jwt');
const { User } = require('../models');
const { Expense, Sheet, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();
const { demoData } = require("../demoData");
const { sheets: demoSheets, expenses: demoExpenses } = demoData;


// AUTHENTICATE
// Authenticates user and creates JWT
router.post("/auth", asyncHandler(async (req, res) => {
      const { email, password } = req.body || {};
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
        attributes: ["id", "email", "passwordHash", "firstName"]
      });
      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isAuth = await bcrypt.compare(password, user.passwordHash);
      if (!isAuth) return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign(
        { userId: user.id},
        process.env.JWT_SECRET,
        { expiresIn: "30m"}
      );

      res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 60 * 1000
      })

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.firstName,
      })

  })
);

// DEMO LOGIN
// Launches demo, creates 5 minute JWT, deletes sheets, creates new sheets 
router.post("/demo", asyncHandler(async (req, res) => {
  console.log("HEY YOU MADE IT STUPID");
      const { email, password } = req.body || {};
      console.log("EMAIL:", email)
      console.log(password);
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
        attributes: ["id", "email", "passwordHash", "firstName"],
      });
      console.log("HERE IS THE USER:", user);
      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isAuth = await bcrypt.compare(password, user.passwordHash);
      console.log("IS AUTH?!?!?!?!?:", isAuth);
      if (!isAuth) return res.status(401).json({ message: "Invalid email or password" });

      // 5 minute jwt for demo view
      const token = jwt.sign(
        { userId: user.id},
        process.env.JWT_SECRET,
        { expiresIn: "5m"}
      );
      console.log("HERE IS THE TOKEN:", token)

      res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60 * 1000
      })

      console.log("WE MADE IT PAST THE COOKIE!!!!!!!!!!")
      // Clear current sheet data for demo
      const demoUserId = user.id;

      console.log("DMEO USER ID!!!!!:", demoUserId);

      await Sheet.destroy({
        where: { userId: demoUserId },
      });

      console.log("WE MADE IT PAST THE DESTROY COMMAND!!!")
      // Generate Demo Seed Data
      console.log("DEMO SHEETS:", demoSheets)
      
      await Sheet.bulkCreate(demoSheets);

      console.log("WE MADE IT PAST THE BULK CREATE!!!")

      const sheets = await Sheet.findAll({
        where: { userId: demoUserId },
        attributes: ["id"],
        raw: true,
      });

      const sheetIds = await sheets.map((sheet) => sheet.id);

      const updatedExpenses = demoExpenses.map((expense) => ({
        ...expense,
        sheetId: sheetIds[expense.sheetId - 1],
      }));

      console.log("HERE IS THE DEMO USER ID:", demoUserId);

      await Expense.bulkCreate(updatedExpenses);

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.firstName,
      })

  })
);


// SIGNUP
// Creates new user, creates a sheet, and creates 15 starter expenses
router.post('/signup', asyncHandler(async (req, res) => {
  try {
    const userData = { ...req.body };
    console.log(userData)

    if (userData.password) {
      userData.passwordHash = await bcrypt.hash(userData.password, 10);
      delete userData.password;
    }

    await sequelize.transaction(async (t) => {

      const createdUser = await User.create(userData, { transaction: t });

      const createdSheet = await Sheet.create({
        userId: createdUser.id,
        label: "New Sheet",
        netIncome: null
      }, { transaction: t });

      const starters = Array.from({ length: 15 }, () => ({
        name: "",
        amount: null,
        isPaid: false,
        sheetId: createdSheet.id
      }));

      await Expense.bulkCreate(starters, { transaction: t });

    });

    res.status(201).end();

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


// RESTORE
// Restores currentUser state to persist after a page refresh
router.get("/restore", authJwt, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.currentUser.id, {
    attributes: ["id", "email", "firstName"],
  });

  if (!user) return res.status(204).end();
  res.json(user);
}));














// SIGN OUT
// Deletes cookie and ends user session
router.post('/signout', asyncHandler(async (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  })

  return res.status(204).send();
}))


module.exports = router;