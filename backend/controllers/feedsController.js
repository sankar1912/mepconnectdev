const donations = require("../models/donations");
const Event = require("../models/eventsfeed");
const Post = require("../models/postsfeed");
const sendEmail = require("../utils/email");
const user = require("../models/user");
const postsfeed = require("../models/postsfeed");
//events
const addnewevent = async (req, res) => {
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
};

const getEventsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    if (department==="common") {
      const events=await Event.find();
      return res.status(200).json({
        message: "Events fetched successfully",
        status: "success",
        events
      });
    }
    const events = await Event.find({ department, verified:true }).populate("owner","profileImage verified");
    if (events.length === 0) {
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
};

//posts

const addNewPost = async (req, res) => {
  try {
    const { name, username, department, time, text, media, hashtags,email } =
      req.body;

    const newPost = new Post({
      id: Date.now(),
      name,
      username,
      department,
      time,
      text,
      media,
      hashtags,
      email,
    });
    await newPost.save();
    let users = [];
    if (department !== "common") {
      users = await user.find({ department, verified:true }).select("email -_id").lean();
      users = users.map((user) => user.email);
    }
    else{
        users = await user.find().select("email -_id").lean();
      users = users.map((user) => user.email);
    }

    // sendEmail.sendPostEmail({
    //   message: `New Post by ${department} Description:${text} `,
    //   email:users,
    //   subject :`New Post By ${department}`,
    //   text,
    //   department,
    //   hashtags
    // });

    res.status(201).json({
      message: "Post added successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addPostLike = async (req, res) => {

  const { email,timestamp } = req.body;
  const { _id } = req.params;

  try {
    const post = await Post.findById(_id);
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    if(post.likedBy.includes(email)){
      return res.status(200).json({
        message: "Post already liked successfully",
        success: true,
      });
    }
    post.likedBy.unshift(email); 
    post.likes=post.likedBy.length;
    await post.save();

    res.status(200).json({
      message: "Post liked successfully",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error: Bad request",
      success: false,
      error: err.message,
    });
  }
};

const removePostLike = async (req, res) => {

  const { email} = req.body;
  const { _id } = req.params;

  try {
    const post = await Post.findById(_id);
    
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    if(!post.likedBy.includes(email)){
      return res.status(200).json({
        message: "Post already not liked successfully",
        success: true,
      });
    }
    post.likedBy=post.likedBy.filter(e=>e!==email); 

    post.likes=post.likedBy.length;
    await post.save();

    res.status(200).json({
      message: "Post unliked successfully",
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error: Bad request",
      success: false,
      error: err.message,
    });
  }
};

const getPostByName=async(req,res)=>{
  try{
    const {_id}=req.params;
    const Post=await postsfeed.find({_id:_id});
    const {email}=Post[0];
    if(Post){
      const myUser=await user.find({email:email});
      return res.status(200).json({
        message:"Post found",
        post:{
          ...Post[0]._doc,
          user:myUser[0],
        },
        success:true
      })
    }
    return res.status(200).json({
      message:"Post found",
      post:Post,
      success:true
    })
  }catch(err){
    return res.status(400).json({
      message:"Post not found",
      post:{},
      success:false
    })
  }
}

const getPostsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;
    let posts;

    if (department === "common") {
      posts = await Post.find({verified:true});
    } else {
      if (!department) {
        return res.status(400).json({
          message: "Department is required",
          status: "error",
        });
      }
      posts = await Post.find({ department,verified:true });
}

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No posts found for this department",
        status: "error",
      });
    }

    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const populatedPosts = await Promise.all(
      posts.map(async (post) => {
        const oneuser = await user.findOne({ email: post.email }).select("-password");
        return {
          ...post._doc,
          user: oneuser || null, 
        };
      })
    );

    return res.status(200).json({
      message: "Posts fetched successfully",
      status: "success",
      posts: populatedPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};


//donations
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

module.exports = {
  addnewevent,
  getEventsByDepartment,
  addNewPost,
  getPostsByDepartment,
  addPostLike,
  removePostLike,
  addDonation,
  getAllDonations,
  getSingleDonations,
  getPostByName
};
