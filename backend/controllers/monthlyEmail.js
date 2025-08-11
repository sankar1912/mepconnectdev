const Event = require("../models/eventsfeed");
const Job = require("../models/jobsfeed");
const User = require("../models/user");
const sendMonthlyFeedEmail = require("../utils/emails/monthlyFeedsEmail");
const Post = require("../models/postsfeed");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendMonthlyReport = catchAsyncError(async (req, res) => {
    try {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const events = await Event.find({ createdAt: { $gte: oneMonthAgo } });
        const jobs = await Job.find({ createdAt: { $gte: oneMonthAgo } });
        const userCount = await User.countDocuments();
        const posts = await Post.find({ createdAt: { $gte: oneMonthAgo } });
        const allUsers = await User.find({}, "email");
        for (const user of allUsers) {
            if (!user.email) continue;
            await sendMonthlyFeedEmail({
                email: [user.email],
                events,
                jobs,
                userCount,
            });
        }

        console.log("Email sent successfully")
    } catch (error) {
        console.error(error);
    }
})

module.exports = { sendMonthlyReport };
