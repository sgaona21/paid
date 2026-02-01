const jwt = require("jsonwebtoken");
const { User } = require("../models");

// verifies user by validating JWT
exports.authJwt = async (req, res, next) => {
  console.log("cookies:", req.cookies);
console.log("token:", req.cookies?.auth);
console.log(req.cookies); 


  try {
    const token = req.cookies?.auth;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = { id: payload.userId };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};