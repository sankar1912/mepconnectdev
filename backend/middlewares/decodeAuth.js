const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const decodeAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.uid,
      email: decoded.email,
    };

    return next();
  } catch (error) {
    console.error('decodeAuth error:', error);

    if (req.cookies?.token) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    return next();
  }
};

module.exports = decodeAuth;
