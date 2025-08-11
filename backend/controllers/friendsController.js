const Friend = require("../models/friends");
const User = require("../models/user");
const Group = require("../models/group");
const friends = require("../models/friends");
const sendFriendRequestEmail = require("../utils/emails/sendFriendRequestEmail");
const catchAsyncError = require("../middlewares/catchAsyncError");

const fetchList = catchAsyncError(async (req, res) => {
    const { email } = req.body;
    try {
        const response = await Friend.findOne({ email })
            .populate('friends')          
            .populate('friendinvites')    
            .populate('blockedUsers');    
        if (!response) {
            return res.status(200).json({
                message: 'User not found',
                success: false,
                result: {}
            });
        }

        return res.status(200).json({
            message: 'Friend list fetched successfully',
            success: true,
            result: response
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Error fetching friend list',
            success: false,
            result: []
        });
    }
})




const addFriend = catchAsyncError(async (req, res) => {
  const { emailId, friendemailId, note } = req.body;
  try {
    const user = await Friend.findOne({ email: emailId });
    const friend = await Friend.findOne({ email: friendemailId });
    if (!user || !friend) {
      return res
        .status(404)
        .json({ message: "User or friend not found", success: true });
    }
    if (friend.friendinvites.includes(user._id)) {
      return res
        .status(400)
        .json({ message: "Friend request already sent", success: true });
    }
    const myuser=await User.findOne({email:emailId});
    friend.friendinvites.push(myuser._id);
    await friend.save();
    const sender = await User.findOne({ email: emailId });
    await sendFriendRequestEmail(friend.email, user.name, sender, note);

    res
      .status(200)
      .json({ message: "Friend request sent successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: true });
  }
})

const acceptFriend = catchAsyncError(async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId || userId === friendId) {
      return res.status(400).json({
        message: "Invalid userId or friendId",
        success: false,
      });
    }
    const cuser=await User.findOne({_id:userId});
    const fuser=await User.findOne({_id:friendId});
    const user = await Friend.findOne({email:cuser.email});
    const friend = await Friend.findOne({email:fuser.email});
    if (!user || !friend) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (user.friendinvites.includes(friendId)) {
      if (!user.friends.includes(friendId)) user.friends.push(friendId);
      if (!friend.friends.includes(userId)) friend.friends.push(userId);

      user.friendinvites = user.friendinvites.filter(id => id.toString() !== friendId);
      friend.friendinvites = friend.friendinvites.filter(id => id.toString() !== userId);
      await user.save();
      await friend.save();

      return res.status(200).json({
        message: "Friend Added Successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "No pending friend request from this user",
        success: false,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error while accepting friend request",
      success: false,
    });
  }
})


const removeFriend =catchAsyncError( async (req, res) => {
  const { userId, friendUserId } = req.body;

  try {
    const user = await Friend.findById(userId);
    const friend = await Friend.findById(friendUserId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }
    user.friends.pull(friendUserId);
    friend.friends.pull(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})
const getMyFriends = catchAsyncError(async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Friend.findById(userId).populate(
      "friends",
      "name email degree"
    ); // Populate friend data

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ friends: user.friends });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})
const getGroups = catchAsyncError(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Friend.findById(userId).populate("groups"); // Populate group data

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ groups: user.groups });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})

const getBlockedUsers = catchAsyncError(async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Friend.findById(userId).populate(
      "blockedUsers",
      "name email degree"
    ); // Populate blocked user data

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ blockedUsers: user.blockedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
})

const getusers = catchAsyncError(async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ friends: users });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = {
  getMyFriends,
  addFriend,
  removeFriend,
  getusers,
  getGroups,
  getBlockedUsers,
  fetchList,
  acceptFriend
};
