const donations = require("../models/donations");
const Event = require("../models/eventsfeed");
const Post = require("../models/postsfeed");
const sendEmail = require("../utils/email");
const user = require("../models/user");
const postsfeed = require("../models/postsfeed");
const catchAsyncError = require("../middlewares/catchAsyncError");

const addnewevent = catchAsyncError(async (req, res) => {
  try {
    const {
      id,
      name,
      title,
      department,
      description,
      likes = 0,
      comments = [],
      shares = 0,
      likedBy = [],
      date,
      time,
      email
    } = req.body;
    //console.log(req.body)
    if (
      !id ||
      !name ||
      !title ||
      !department ||
      !description ||
      !date ||
      !time
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        status: "error",
      });
    }
    const User=await user.findOne({email:email});
    const newEvent = new Event({
      id,
      name,
      title,
      department,
      description,
      likes,
      comments,
      shares,
      likedBy,
      date,
      time,
      email,
      owner:User.toJSON()._id,
    });
    const response = await newEvent.save();
    let users = [];
    if (department !== "common") {
      users = await user.find({ department }).select("email -_id").lean();
      users = users.map((user) => user.email);
    }
    else{
        users = await user.find().select("email -_id").lean();
      users = users.map((user) => user.email);
    }

    // sendEmail.sendEventEmail({
    //   message: `New Event:${title} By ${department} Description:${description} `,
    //   email:users,
    //   subject :`New Event:${title} By ${department}`,
    //   title,
    //   department,
    //   description
    // });
    return res.status(201).json({
      message: "Event Added Successfully",
      status: "success",
      event: response,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
})

const getEventsByDepartment = catchAsyncError(async (req, res) => {
  try {
    const { department } = req.params;
    const {page, limit} = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    if (department==="common") {
      const events=await Event.find();
      return res.status(200).json({
        message: "Events fetched successfully",
        status: "success",
        events
      });
    }
    const events = await Event.find({ department, verified:true })
    .populate("owner","profileImage verified")      
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    const length = await Event.find({department, verified:true}).countDocuments();

    res.cookie("totalEvents", length.toString(), {
      maxAge: 60 * 60 * 1000, 
    });
    if (events.length === 0) {
      res.clearCookie("totalEvents")
      return res.status(404).json({
        message: "No events found for this department",
        status: "error",
        events:[]
      });
    }
    events.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.status(200).json({
      message: "Events fetched successfully",
      status: "success",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
      events:[]
    });
  }
})

module.exports={getEventsByDepartment, addnewevent}