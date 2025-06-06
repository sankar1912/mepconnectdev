const donations = require("../models/donations");
const Event = require("../models/eventsfeed");
const Post = require("../models/postsfeed");
const sendEmail = require("../utils/email");
const user = require("../models/user");
const postsfeed = require("../models/postsfeed");


const addDonation = async (req, res) => {
  try {
    const {
      campaignName,
      goalAmount,
      description,
      contact,
      razorpayUrl,
      startDate,
      endDate,
      image,
      dept,
      govtId,
      email,
      aadhar,
      pan
    } = req.body;

    const donation = new donations({
      campaignName,
      goalAmount,
      description,
      contact,
      razorpayUrl,
      startDate,
      endDate,
      image,
      department:dept,
      govtProof:govtId,
      email,
      aadhar,
      pan,
    });

    await donation.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Donation added successfully!",
        donation,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donation = await donations.find({verified:true});
    res.status(200).json({ success: true, donations: donation });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
      donations: [],
    });
  }
};

const getSingleDonations = async (req, res) => {
  const { id } = req.params;
  try {
    const donation = await donations.find({ _id: id });
    if(donation){
      const User=await user.findOne({email:donation[0].email}).select("-password");
      return res.status(200).json({
        success:true,
        donation:{
          ...donation[0]._doc,
          user:User
        }
      })
    }else{
       res.status(200).json({ success: true, donations: donation });
    }
   
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
      donations: [],
    });
  }
};

module.exports={addDonation, getSingleDonations,getAllDonations}