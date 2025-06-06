const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  razorpayUrl: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  image: { type: String, required: true }, 
  govtProof:{ type: String, required: true },
  verified:{type:Boolean,default:false},
  department:{type:String, required:true},
  email:{type:String, required:true},
  aadhar:{type:String,required:true},
  pan:{type:String,required:true},
  donors:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }]
});

module.exports = mongoose.model("Donation", DonationSchema);
