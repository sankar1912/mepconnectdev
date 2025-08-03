const nodemailer = require("nodemailer");


const sendPostEmail = async (options) => {
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
            <title>New Post Alert!</title>
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
                .hashtags {
                    font-size: 14px;
                    color: #007bff;
                    font-weight: bold;
                    margin-top: 10px;
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
                    <h1>📝 New Post by ${options.department}!</h1>
                </div>
                <div class="content">
                    <p><strong>Department:</strong> ${options.department}</p>
                    <p><strong>Description:</strong></p>
                    <p>${options.text}</p>
                    <p class="hashtags">📌 Hashtags: ${options.hashtags}</p>
                    <a href=${process.env.FRONTEND_URI} class="btn">Read More</a>
                </div>
                <p class="footer">© 2025 mepconnect.org. All rights reserved.</p>
            </div>
        </body>
        </html>
        `;

        const message = {
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: process.env.SMTP_FROM_EMAIL,
            bcc: options.email,
            subject: `📝 New Post: ${options.title} by ${options.department}`,
            text: `New Post by ${options.department}\n\n${options.text}\n\nHashtags: ${options.hashtags}\n\nRead more at: https://sankaranarayanank.onrender.com`,
            html: htmlContent,
        };
        await transporter.sendMail(message);
        
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



module.exports = {sendPostEmail};
