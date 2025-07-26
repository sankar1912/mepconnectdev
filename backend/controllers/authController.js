const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

const SECRET_KEY = process.env.JWT_SECRET || "lms@kt?=";

const EXPIRE_DURATION = process.env.EXPIRE || "7d"; 
const Friend = require('../models/friends'); 
const chats=require('../models/chats');
const sendToken = require("../utils/jwt");
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = user.matchPassword(password, user.salt, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { uid: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send token response to the client
    //sendToken(user, 201, res);
    
    res.status(200).json({
      message: "Login successful",
      user: user,
    });

  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};



exports.logoutUser = async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ message: "Error logging out", error: error.message });
    }
    
  };




  exports.registerUser = async (req, res) => {
    const { name, email, password, batch, degree, department, place, profileImage, phone, dob, father, mother, education=[], experience=[] } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.createHash("sha512");
      hash.update(salt + password); // Concatenate salt and password before hashing
      const hashedPassword = hash.digest("hex");
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        salt: salt, // Store the salt in the database
        batch,
        degree,
        role: "user",
        department,
        place,
        profileImage,
        phone,
        dob,
        father,
        mother,
        experience,
        education,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Create a new friend document for this user
      const newFriendDoc = new Friend({
        name,
        email,
        friends: [],
        friendinvites: [],
        groups: [],
        groupinvites: [],
        blockedUsers: [],
      });
  
      await newFriendDoc.save();
      const token = jwt.sign(
        { uid: newUser._id, email: newUser.email },
        SECRET_KEY,
        { expiresIn: EXPIRE_DURATION }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };

//Load user
exports.loadUser = async (req, res) => {

    try {
      const {token} = req.cookies;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, SECRET_KEY);
  
      const user = await User.findById(decoded.uid).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found",token:decoded });
      }
      res.status(200).json({ message: "User loaded successfully", user });
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      res.status(500).json({ message: "Error loading user", error: error.message });
    }
  };

