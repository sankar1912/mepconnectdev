const { default: mongoose } = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  });

  module.exports= mongoose.model("experience",workExperienceSchema);