const crypto = require("crypto");
const verifySignatureMiddleware = (req, res, next) => {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    const razorpaySignature = req.headers["x-razorpay-signature"];

    if (!razorpaySignature) {
        console.log("Missing Webhook Signature")
        return res.status(400).json({ error: "Missing Webhook Signature" });
    }

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(payload)
        .digest("hex");

    if (expectedSignature === razorpaySignature) {
        console.log("Valid Webhook Signature!");
        next();
    } else {
        console.error("Invalid Webhook Signature!");
        return res.status(400).json({ error: "Invalid Webhook Signature" });
    }
};

module.exports= verifySignatureMiddleware;