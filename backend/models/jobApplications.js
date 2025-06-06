const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  degree: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  batch: { type: String, required: true, trim: true },
  place: { type: String, required: true, trim: true },
  experience: { type: String, required: true, trim: true },
  skills: { type: [String], required: true },
  additionalInfo: { type: String, trim: true },
  resume: { type: String, required: true, trim: true },
  status:{type:Boolean,default:false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobApplications', jobApplicationSchema);
