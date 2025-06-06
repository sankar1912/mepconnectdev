const Post = require("../models/postsfeed");
const Event = require("../models/eventsfeed");
const Donation = require("../models/donations");

const activityFinder = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ error: "Email parameter is required" });
        }
        const [posts, events, donations] = await Promise.all([
            Post.find({ email }),
            Event.find({ email }),
            Donation.find({ email })
        ]);
        return res.status(200).json({ posts, events, donations });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = activityFinder;
