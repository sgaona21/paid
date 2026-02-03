const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authJwt } = require('../middleware/auth-jwt');
const { User } = require('../models');
const { Expense, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();


// AUTHENTICATE
// Authenticates user and creates JWT
router.post("/auth", asyncHandler(async (req, res) => {
      const { email, password } = req.body || {};
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
        attributes: ["id", "email", "passwordHash", "firstName"],
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

// SIGNUP
// Creates new user and creates 10 starter expense rows in the db
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

      const starters = Array.from({ length: 10 }, () => ({
        name: "",
        amount: null,
        isPaid: false,
        userId: createdUser.id
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