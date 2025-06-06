const nodemailer = require("nodemailer");
const sendEventEmailVerified = async (options) => {

    const frontendUrl=process.env.FRONTEND_URI;
    const {event}=options;
    const eventLink= `${frontendUrl}`

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_SECRET,
            },
        });

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Donation Campaign</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", sans-serif;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .image-container {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
    }
    .image-container img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    .gradient-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
    }
    .content {
      padding: 24px;
      text-align: left;
    }
    h2 {
      margin: 0 0 8px;
      font-size: 20px;
      color: #333;
    }
    .subtext {
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .amount {
      font-size: 16px;
      color: #1976d2;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .description {
      font-size: 14px;
      color: #444;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .dates {
      font-size: 12px;
      color: #888;
      margin-bottom: 20px;
    }
    .btn {
      display: inline-block;
      background-color: #1976d2;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      text-align: center;
    }
      a{
    text-decoration:none;
    color: #ffffff;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2>${event.title}</h2>
      <div class="subtext">Organized by: ${event.department}</div>
      <div class="description">
        ${event.description}...
      </div>
      <div class="dates">
        Date: ${event.date}<br />
        Time: ${event.time}
      </div>
      <a class="btn" href="${eventLink}" target="_blank">View Event</a>
    </div>
    <div class="footer">© 2025 mepconnect.org — All rights reserved.</div>
  </div>
</body>
</html>
`;

        const message = {
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: options.message,
            text: options.text,
            html: htmlContent,
        };
        await transporter.sendMail(message);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



const sendEventEmailRemoved = async (options) => {
    const frontendUrl=process.env.FRONTEND_URI;
    const {event} = options;
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_SECRET,
            },
        });

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>event Campaign Rejected</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", sans-serif;
      background-color: #fdf2f2;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border: 1px solid #f44336;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
    }
    .image-container {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
    }
    .image-container img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
    }
    .gradient-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
    }
    .content {
      padding: 24px;
      text-align: left;
    }
    h2 {
      margin: 0 0 8px;
      font-size: 22px;
      color: #b71c1c;
    }
    .subtext {
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }
    .amount {
      font-size: 16px;
      color: #b71c1c;
      margin-bottom: 12px;
      font-weight: 600;
    }
    .description {
      font-size: 14px;
      color: #444;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .dates {
      font-size: 12px;
      color: #888;
      margin-bottom: 20px;
    }
      a{
    text-decoration:none;
    color: #ffffff;
    }
    .message-box {
      background-color: #ffebee;
      border-left: 4px solid #f44336;
      padding: 12px 16px;
      margin-bottom: 24px;
      border-radius: 4px;
      color: #d32f2f;
      font-size: 14px;
    }
    .btn {
      display: inline-block;
      background-color: #d32f2f;
      color: white;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      padding: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2>${event.title}</h2>
      <div class="subtext">Organized by: ${event.department}</div>
      <div class="amount">Goal Amount: ₹${event.goalAmount}</div>
      <div class="description">
        ${event.description}...
      </div>
      <div class="dates">
        Date: ${event.date}<br />
        Time: ${event.time}
      </div>

      <div class="message-box">
        Unfortunately, your event campaign did not meet our approval criteria at this time.  
        <br /><br />
        We encourage you to review the campaign details, ensure clarity, completeness, and alignment with our platform’s guidelines, and try again. We're here to support you!
      </div>

      <a class="btn" href="${frontendUrl}/contact" target="_blank">Contact Support</a>
    </div>
    <div class="footer">© 2025 mepconnect.org — All rights reserved.</div>
  </div>
</body>
</html>
`;


        const message = {
            from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
            to: options.email,
            subject: options.message,
            text: options.text,
            html: htmlContent,
        };
        await transporter.sendMail(message);
        console.log("Verification email sent successfully!");
    } catch (error) {
        console.error("Error sending verification email:", error);
    }
};



module.exports={sendEventEmailVerified, sendEventEmailRemoved}