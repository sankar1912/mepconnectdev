const jwt = require("jsonwebtoken");
const user = require("../models/user");

const SECRET_KEY = process.env.JWT_SECRET || "lms@kt?="; 
const verifyAdmin =async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    const userDoc = await user.findOne({_id:req.user.uid});
    if(userDoc.role!=="admin"){
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports= {verifyAdmin}

