const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const router = express.Router();

//Authorize user
router.post("/auth", asyncHandler(async (req, res) => {
    try {
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
        { expiresIn: "15m"}
      );

      res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
      })

      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.firstName,
      })

    } catch (error) {
      console.log(error)
    }
  })
);


// CREATE a new user 
router.post('/', asyncHandler(async (req, res) => {
  try {
    const user = req.body;

    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 10);
      delete user.password;
    }
    await User.create(user);
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