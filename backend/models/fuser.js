const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  batch: { type: String, required: true },
  degree: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  place: { type: String, required: true },
  profileImage: { type: String },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default:"" },
  tokenExpiry: { type: Date },
  transactions: { type: [mongoose.Schema.Types.Mixed], default: [] },
  applications: { type: [mongoose.Schema.Types.Mixed], default: [] },
  issigned: { type: Boolean, default: false }
});

userSchema.methods.generateVerificationToken = function () {
  const secret = process.env.JWT_SECRET;
  const data = `${this._id}:${this.email}`;
  const token = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');
  this.verificationToken = token;
  this.tokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now
  return token;
};

module.exports = mongoose.model('fusers', userSchema);
