const donations = require("../models/donations");
const Event = require("../models/eventsfeed");
const Post = require("../models/postsfeed");
const sendEmail = require("../utils/email");
const user = require("../models/user");
const postsfeed = require("../models/postsfeed");
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
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const { department } = req.params;

    if (!department) {
      return res.status(400).json({
        message: "Department is required",
        status: "error",
      });
    }

    let filter = { verified: true };
    if (department !== "common") {
      filter.department = department;
    }

    const totalPosts = await Post.countDocuments(filter);

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    if (posts.length === 0) {
      res.clearCookie("totalPosts")
      return res.status(404).json({
        message: "No posts found for this department",
        status: "error",
      });
    }

    const populatedPosts = await Promise.all(
      posts.map(async (post) => {
        const oneuser = await user.findOne({ email: post.email }).select("-password -salt");
        return {
          ...post._doc,
          user: oneuser || null,
        };
      })
    );
    res.cookie("totalPosts", totalPosts.toString(), {
      maxAge: 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "Posts fetched successfully",
      status: "success",
      posts: populatedPosts,
      total: totalPosts,
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: "error",
    });
  }
};



module.exports ={addNewPost, getPostByName, getPostsByDepartment, addPostLike, removePostLike}