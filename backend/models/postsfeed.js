const mongoose = require("mongoose");
const { isLowercase } = require("validator");

const commentSchema = new mongoose.Schema({
  id: {type:mongoose.Schema.Types.ObjectId, ref:"user"},
  message:{type:String, default:""}
}, {timestamps:true})

const postSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    department: { type: String, required: true },
    time: { type: String, required: true },
    text: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: [commentSchema], default: [] },
    shares: { type: Number, default: 0 },
    media: { type: [String], default: [] }, 
    hashtags: { type: [String], default: [] },
    email:{type:String,required:true},
    verified:{type:Boolean,default:false},
    likedBy:{type:[String],default:[],isLowercase:true}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Post", postSchema);
