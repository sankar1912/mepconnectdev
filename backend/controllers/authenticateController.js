const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "lms@kt?="; 
exports.verifyToken = (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


