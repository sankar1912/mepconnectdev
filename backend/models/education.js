const mongoose = require("mongoose")
const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  });

  module.exports= mongoose.model("education",educationSchema);