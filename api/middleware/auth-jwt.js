const jwt = require("jsonwebtoken");
const { User } = require("../models");

// verifies user by validating JWT
exports.authJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = { id: payload.id };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};