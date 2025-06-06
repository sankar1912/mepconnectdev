const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: {type: Number,required: true,},
  name: {type: String,required: true,trim: true},
  email: { type: String, required: true},
  department: {type: String,required: true,trim: true,},
  title: {type: String,required: true,trim: true,},
  likes: {type: Number,default: 0,},
  comments: {type: Number,default: 0,},
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  owner:{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User' 
          },

  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("Event", eventSchema);
