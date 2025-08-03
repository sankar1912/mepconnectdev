// utils/sendMonthlyEmail.js
const nodemailer = require("nodemailer");
const htmlContent = require("../html/newsFeed");

const sendMonthlyFeedEmail = async ({ email=[], events=[], jobs=[], userCount, posts=[] }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_SECRET,
            },
        });

        const html = htmlContent({ events, jobs, userCount, posts });

        await transporter.sendMail({
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: "Mepconnect Monthly News Letter",
            html: html,
        });

        console.log(`✅ Email sent to ${email}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};

module.exports = sendMonthlyFeedEmail;
