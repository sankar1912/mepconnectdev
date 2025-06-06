const nodemailer = require("nodemailer");

const sendSuccessEmail = async (options) => {
    const frontendUrl=process.env.FRONTEND_URI
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_SECRET,
            },
        });

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Account Verified</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    background: #ffffff;
                    padding: 20px;
                    margin: 20px auto;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .header {
                    background-color: #28a745;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 22px;
                }
                .content {
                    padding: 20px;
                    text-align: left;
                }
                h2 {
                    color: #333;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 10px;
                }
                .btn {
                    display: inline-block;
                    background-color: #28a745;
                    color: white;
                    padding: 12px 20px;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                    margin-top: 20px;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✅Account Verified!</h1>
                </div>
                <div class="content">
                    <h2>Congratulations</h2>
                    <p>Your account has been successfully verified. You can now access all features of our platform.</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <a href=${frontendUrl} class="btn">Go to Dashboard</a>
                </div>
                <p class="footer">© 2025 mepconnect.org. All rights reserved.</p>
            </div>
        </body>
        </html>
        `;

        const message = {
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: "Hurrah!Your Account is Verified!",
            text: `Hey,\n\nYour account has been successfully verified! You can now log in and enjoy our services.\n\nVisit your dashboard: ${frontendUrl}\n\nRegards,\nMepConnect Team`,
            html: htmlContent,
        };
        await transporter.sendMail(message);
        console.log("Verification email sent successfully!");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};

const sendRemoveEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_SECRET,
            },
        });

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Account Removed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    background: #ffffff;
                    padding: 20px;
                    margin: 20px auto;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                .header {
                    background-color: #dc3545;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 22px;
                }
                .content {
                    padding: 20px;
                    text-align: left;
                }
                h2 {
                    color: #333;
                    margin-bottom: 10px;
                }
                p {
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 10px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #999;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>⚠️Account Removed</h1>
                </div>
                <div class="content">
                    <h2>Hey, there</h2>
                    <p>We regret to inform you that your account has been removed from our platform.</p>
                    <p>If this was a mistake or you have any concerns, please contact our support team.</p>
                </div>
                <p class="footer">© 2025 mepconnect.org. All rights reserved.</p>
            </div>
        </body>
        </html>
        `;

        const message = {
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: "⚠️ Your Account Has Been Removed",
            text: `Hey,\n\nWe regret to inform you that your account has been removed from our platform.\nIf this was a mistake or you need assistance, please contact support.\n\nRegards,\nMEP Connect Team`,
            html: htmlContent,
        };
        await transporter.sendMail(message);
        console.log("Account removal email sent successfully!");
    } catch (error) {
        console.error("Error sending account removal email:", error);
    }
};

module.exports = { sendSuccessEmail, sendRemoveEmail };
