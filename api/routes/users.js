const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const router = express.Router();

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