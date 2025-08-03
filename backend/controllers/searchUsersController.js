const User = require("../models/user");
const Post = require("../models/postsfeed");
const Event = require("../models/eventsfeed");
const Donation = require("../models/donations");
const Friends = require("../models/friends");
const searchUser = async (req, res) => {
  try {
    const { place, batch, dept, name, company } = req.query;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};

    if (req.user?.email) {
      query.email = { $ne: req.user.email };
    }

    if (place) {
      query.place = Array.isArray(place) ? { $in: place } : place;
    }

    if (dept) {
      query.department = Array.isArray(dept) ? { $in: dept } : dept;
    }

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (company) {
      query.experience = {
        $elemMatch: {
          company: { $regex: `.*${company}.*`, $options: "i" },
        },
      };
    }

    if (batch) {
      const batchYears = Array.isArray(batch)
        ? batch.map(Number)
        : [Number(batch)];
      query.$or = batchYears.map((year) => ({
        batch: {
          $regex: `^${year}-|-${year}$|^${year}$`,
          $options: "i",
        },
      }));
    }
    console.log
    const users = await User.find(query).skip(skip).limit(parseInt(limit));

    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    console.error("Error in searchUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchUserById = async (req, res) => {
  const { _id } = req.params;
  const { email } = req.body;
  try {
    if (!email) {
      const user = await User.findById(_id).select("-password");
      //const friendUser= await Friends.findOne({email:user.email});
      if (!user) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      } else {
        return res.status(200).json({
          message: "User data retrieved successfully",
          success: true,
          user,
          posts: [],
          events: [],
          donations: [],
        });
      }
    }
    const requser = await Friends.findOne({ email: email });
    const user = await User.findById(_id).select("-password");
    //const friendUser= await Friends.findOne({email:user.email});
    if (user.email === email) {
      const userEmail = user.email;
      let resuser = user.toJSON();
      resuser.friend = true;
      const [posts, events, donations] = await Promise.all([
        Post.find({ email: userEmail }),
        Event.find({ email: userEmail }),
        Donation.find({ email: userEmail }),
      ]);
      return res.status(200).json({
        message: "User data retrieved successfully",
        success: true,
        user: resuser,
        posts,
        events,
        donations,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (!requser.friends.includes(user._id)) {
      let resuser = user.toJSON();
      resuser.friend = false;
      return res.status(200).json({
        message: "User data retrieved successfully",
        success: true,
        user: resuser,
        posts: [],
        events: [],
        donations: [],
      });
    }

    const userEmail = user.email;
    let resuser = user.toJSON();
    resuser.friend = true;
    const [posts, events, donations] = await Promise.all([
      Post.find({ email: userEmail }),
      Event.find({ email: userEmail }),
      Donation.find({ email: userEmail }),
    ]);
    return res.status(200).json({
      message: "User data retrieved successfully",
      success: true,
      user: resuser,
      posts,
      events,
      donations,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
      user: null,
      posts: [],
      events: [],
      donations: [],
    });
  }
};

module.exports = { searchUser, searchUserById };
