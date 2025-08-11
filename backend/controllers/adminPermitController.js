const mongoose = require("mongoose");
const user = require("../models/user");
const { sendSuccessEmail, sendRemoveEmail } = require("../utils/emails/verifyUser");
const post=require('../models/postsfeed');
const events=require('../models/eventsfeed');
const donations = require("../models/donations");
const sendEventEmail = require("../utils/emails/verifyEvent");
const sendPostEmail = require("../utils/emails/verifyPost");
const jobsfeed = require("../models/jobsfeed");

const {sendDonationEmailVerified, sendDonationEmailRemoved} = require('../utils/emails/verifyDonation');
const { sendJobEmailVerified } = require("../utils/emails/sendJobEmail");
const catchAsyncError = require("../middlewares/catchAsyncError");

const models = {
  users: require("../models/user"),
  posts: require("../models/postsfeed"),
  events: require("../models/eventsfeed"),
  donations: require("../models/donations"),
  jobs:require("../models/jobsfeed")
};

const fetchPermit =catchAsyncError( async (req, res) => {
  try {
    const { fetchData, dept } = req.body;

    if (!fetchData || !models[fetchData]) {
      return res.status(400).json({ message: "Invalid collection name" });
    }

    const Model = models[fetchData];
    let results=[]
    if(dept ==="common"){
      results = await Model.find({ verified: false }).populate("owner");
    }else{
      results = await Model.find({ department: dept, verified: false });
    }

    const enrichedResults = await Promise.all(
      results.map(async (item) => {
        if (!item.email) return item;
        
        const user = await models.users.findOne({ email: item.email }).lean();
        return {
          ...item.toObject(),
          user: user || null,
        };
      })
    );

    res.status(200).json({
      message: "Success",
      results: enrichedResults,
    });
  } catch (error) {
    console.error("Error fetching permit data:", error);
    res.status(500).json({ message: "Server Error" });
  }
})

//Users verification
const updateUserVerified = catchAsyncError(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required",success:false });
    }

    const User = await user.findOne({ email }); 

    if (!User) {
      return res.status(404).json({ message: "User not found",success:false });
    }

    await User.updateOne({ $set: { verified: true } });
    await sendSuccessEmail({email:email})
    return res.status(200).json({ message: "User verified successfully",success:true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
})
const updateUserRemoved = catchAsyncError(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required",success:false });
    }

    const User = await user.findOne({ email }); 

    if (!User) {
      return res.status(404).json({ message: "User not found",success:false });
    }

    await user.deleteOne({email})
    await sendRemoveEmail({email:email})
    return res.status(200).json({ message: "User Removed successfully",success:true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error",success:false });
  }
})


//Posts Update
const updatePostVerified = catchAsyncError(async (req, res) => {
  try {
    const { email, id } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
    }

    const Post = await post.findOne({ _id: id });
    if (!Post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }
    const author= await user.findOne({email:Post.email})
    const users = await user.find({ department: Post.department }).select("email");

    if (!users.length) {
      return res.status(404).json({ message: "No users found in this department", success: false });
    }

    const userEmails = users.map(user => user.email);
    await sendPostEmail.sendPostEmailVerified({
      message: `See what ${Post.name} shared`,
      email: userEmails, 
      text: `${Post.text.slice(0,50)}...`,
      post:Post,
      author:author
    });

    // Update the post as verified
    await Post.updateOne({ $set: { verified: true } });

    return res.status(200).json({ message: "Post verified and email sent successfully", success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
})


const updatePostRemoved=catchAsyncError(async(req,res)=>{
  try{
    const {email,id}=req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required",success:false });
  }
  const Post = await post.findOne({ _id:id }); 
  const author= await user.findOne({email:Post.email})

  if (!Post) {
    return res.status(404).json({ message: "Post not found",success:false });
  }
  await sendPostEmail.sendPostEmailRemoved({
    message: `Sorry! We're unable to process your Post Approval`,
    email: Post.email, 
    text: `${Post.text.slice(0,50)}...`,
    post:Post,
    author:author
  });
  await Post.deleteOne({_id:id});
  return res.status(200).json({message:"Post deleted Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }
})

//Events Verification
const updateEventVerified = catchAsyncError(async (req, res) => {
  try {
    const { email, id } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
    }

    const Post = await events.findOne({ _id: id });
    if (!Post) {
      return res.status(404).json({ message: "Event not found", success: false });
    }

    const users = await user.find({ department: Post.department }).select("email");

    if (!users.length) {
      return res.status(404).json({ message: "No users found in this department", success: false });
    }

    const userEmails = users.map(user => user.email);
    await sendEventEmail.sendEventEmailVerified({
      message: `See What's Happening!! New Event Orgnaized`,
      email: userEmails, 
      text: `${Post.description}`,
      event:Post.toJSON()
    });

    // Update the post as verified
    await Post.updateOne({ $set: { verified: true } });

    return res.status(200).json({ message: "Event verified and email sent successfully", success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
  }
})

const updateEventRemoved=catchAsyncError(async(req,res)=>{
  try{
    const {email,id}=req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required",success:false });
  }
  const Post = await events.findOne({ _id:id }); 
  if (!Post) {
    return res.status(404).json({ message: "Event not found",success:false });
  }
  await sendEventEmail.sendEventEmailRemoved({
    message: `Sorry! We're unable to process your Event Approval`,
    email: Post.email, 
    text: Post.title,
    event:Post,
  });

  await Post.deleteOne({_id:id});
  return res.status(200).json({message:"Event deleted Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }

})


//Donations Verification
const updateDonationVerified=catchAsyncError(async(req,res)=>{
  try{
    const {email,url,days,id}=req.body; 
  if (!email|| !url) {
    return res.status(400).json({ message: "Email is required",success:false });
  }
  const donation = await donations.findOne({ _id:id }); 
  if (!donation) {
    return res.status(404).json({ message: "Donation not found",success:false });
  }
  const users = await user.find({ department: donation.department }).select("email");

    if (!users.length) {
      return res.status(404).json({ message: "No users found in this department", success: false });
    }

  const userEmails = users.map(user => user.email);
  await donation.updateOne({
    $set: {
      verified: true,
      razorpayUrl: url,
      startDate: Date.now(),
      endDate: Date.now() + days * 1000 * 60 * 60 * 24
    }
    
  });
    await sendDonationEmailVerified({
      message: `Someone might Needs your help! Take a Minute`,
      email: userEmails, 
      text: donation.title,
      donation:donation,
    })
  return res.status(200).json({message:"Donation verified Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }
}
)

const updateDonationRemoved=async(req,res)=>{
  try{
    const {id}=req.body;
  if (!id) {
    return res.status(400).json({ message: "Email is required",success:false });
  }
  const donation = await donations.findOne({_id:id }); 
  if (!donation) {
    return res.status(404).json({ message: "Donation not found",success:false });
  }

  await sendDonationEmailRemoved({
    message: `Sorry! We're unable to process your Donation Approval`,
    email: donation.email, 
    text: donation.title,
    donation:donation,
  })
  await donation.deleteOne({_id:id});
  return res.status(200).json({message:"Donation deleted Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }
}


//Jobs Verification


const updateJobVerified=catchAsyncError(async(req,res)=>{
  try{
    const {id}=req.body; 

  const jobDoc = await jobsfeed.findOne({ _id:id }).populate("owner"); 
  if (!jobDoc) {
    return res.status(404).json({ message: "Job not found",success:false });
  }
  await jobDoc.updateOne({
    $set: {
      verified: true,
    }
  });
  const userDoc = await user.find().select("email");
  await sendJobEmailVerified({
    job:jobDoc,
    author:jobDoc.owner,
    email:userDoc,
    message:"Job Alert",
    text:`New Job-${jobDoc.title}`
  })
  return res.status(200).json({message:"Job verified Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }
}
)

const updateJobRemoved=catchAsyncError(async(req,res)=>{
  try{
    const {id}=req.body;
  if (!id) {
    return res.status(400).json({ message: "Email is required",success:false });
  }
  const jobDoc = await jobsfeed.findOne({_id:id }); 
  if (!jobDoc) {
    return res.status(404).json({ message: "Job not found",success:false });
  }
  await jobDoc.deleteOne({_id:id});
  return res.status(200).json({message:"Job deleted Successfully",success:true});
  }catch(err){
    res.status(500).json({mesage:"Internal server error",success:false});
  }
})




module.exports = {fetchPermit,updateUserVerified,updateUserRemoved,
                  updatePostRemoved,updatePostVerified,
                  updateEventRemoved,updateEventVerified,
                  updateDonationVerified,updateDonationRemoved,
                  updateJobRemoved, updateJobVerified
                };
