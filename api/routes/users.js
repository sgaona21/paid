const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { User } = require('../models');
const { Expense, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = express.Router();


//Authorize user
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

//SIGNUP && CREATES 10 STARTER ROWS FOR NEW USER
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
        paid: false,
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

//Persist Refresh 
router.get('/refresh', asyncHandler(async (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated"});
  }
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.userId;
  
  const user = await User.findByPk(req.userId, {
    attributes: ["id", "email", "firstName"],
  })

    res.json(user);
  
}));

//Sign Out
router.post('/signout', asyncHandler(async (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  })

  return res.status(204).send();
}))


module.exports = router;