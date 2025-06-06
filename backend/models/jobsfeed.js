const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  owner:{type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  industry: { type: String, required: true },
  workType: { type: String, required: true },
  workMode: { type: String, required: true },
  salary: { type: String, required: true },
  experience: { type: String, default: "0" },
  experienceLevel:{ type: String, required: true },
  location: { type: String, required: true },
  proofUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobApplications",
    default: []
  }],
  verified:{type:Boolean, required:false, default:false}
});

module.exports = mongoose.model("Jobs", jobsSchema);
