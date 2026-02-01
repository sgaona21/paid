const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Auth middleware verifies user by validating JWT 
exports.authJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.auth;
    if (!token) return res.status(204).json();

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = { id: payload.userId };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};