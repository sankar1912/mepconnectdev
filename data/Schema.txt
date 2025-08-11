const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: [true, "Email-ID Already exist"], validate: [validator.isEmail, 'Please enter valid Email ID'] },
  password: { type: String, required: true },
  batch: { type: String, required: true }, 
  degree: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  place: { type: String, required: true }, 
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  verified:{type:Boolean,default:false},
  transactions:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transactions"
  }],
  applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Jobs"
  }],
  salt: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordTokenExpire: { type: Date },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ user_id: this.user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE,
  });
};


userSchema.methods.getResetToken = function () {
  const token = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;
  return this.resetPasswordToken;
};


// Function to generate salt and hash the password
userSchema.methods.hashPassword = function (password) {
  const salt = crypto.randomBytes(16).toString("hex"); 
  const hash = crypto.createHash("sha512");
  hash.update(salt + password);
  const hashedPassword = hash.digest("hex");
  return { salt, hashedPassword };
};

userSchema.methods.matchPassword = function (password, storedSalt, storedHash) {
  const hash = crypto.createHash("sha512");
  hash.update(storedSalt + password); 
  const hashedPassword = hash.digest("hex"); 
  return hashedPassword === storedHash;
};



module.exports = mongoose.model("User", userSchema);
