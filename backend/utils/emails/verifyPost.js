const nodemailer = require("nodemailer");

const sendPostEmailVerified = async (options) => {
  const frontendUrl = process.env.FRONTEND_URI;
  const { post, author } = options;
  const campaignLink = `${frontendUrl}/post/view/${post._id}`;
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
          <title>New Post Alert</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #f0f2f5;
              font-family: 'Segoe UI', sans-serif;
            }
            .card {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            }
            .image-container {
              width: 100%;
              height: 300px;
              overflow: hidden;
            }
            .image-container img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .content {
              padding: 24px;
            }
            .header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
            }
            .avatar {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-color: #ccc;
            }
            .user-info {
              font-size: 16px;
            }
            .user-info span {
              display: block;
              font-weight: bold;
              color: #333;
            }
            .user-info small {
              color: #666;
              font-size: 13px;
            }
            .text {
              font-size: 15px;
              color: #444;
              line-height: 1.5;
              margin: 16px 0;
            }
            .hashtags {
              margin: 8px 0 16px;
            }
            .hashtags span {
              display: inline-block;
              background-color: #e3f2fd;
              color: #1976d2;
              padding: 4px 12px;
              border-radius: 16px;
              margin-right: 6px;
              font-size: 12px;
              font-weight: 500;
            }
            .dates {
              font-size: 13px;
              color: #888;
              margin-bottom: 20px;
            }
            .cta {
              text-align: center;
              margin: 20px 0;
            }
            .cta a {
              background-color: #1976d2;
              color: #fff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-weight: bold;
              display: inline-block;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #999;
              padding: 16px;
            }
              a{
    text-decoration:none;
    color: #ffffff;
    }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="image-container">
              <img src="${post.media[0]}" alt="Post image" />
            </div>
            <div class="content">
              <div class="header">
                <div class="avatar" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden;">
                <img src="${
                        author.profileImage
                    }" alt="Image" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>

                <div class="user-info">
                  <span>${post.name}</span>
                  <small>${author.department}-${author.batch}</small>
                </div>
              </div>
              <div class="text">
                ${post.text.slice(0, 200)}...
              </div>
              <div class="hashtags">
                ${(post.hashtags || [])
                  .map((tag) => `<span>#${tag}</span>`)
                  .join("")}
              </div>
              <div class="cta">
                <a href="${campaignLink}" target="_blank">View Full Post</a>
              </div>
            </div>
            <div class="footer">© 2025 mepconnect.org — All rights reserved.</div>
          </div>
        </body>
        </html>`;

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

const sendPostEmailRemoved = async (options) => {
  const frontendUrl = process.env.FRONTEND_URI;
  const { post, author } = options;
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
  <title>Post Rejected</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #fff5f5;
      font-family: "Segoe UI", sans-serif;
    }
    .card {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(244, 67, 54, 0.2);
      border: 1px solid #f44336;
    }
    .image-container {
      width: 100%;
      height: 260px;
      overflow: hidden;
      position: relative;
    }
    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .gradient-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
    }
    .content {
      padding: 24px;
    }
    h2 {
      font-size: 22px;
      margin-bottom: 10px;
      color: #c62828;
    }
    .subtext {
      color: #666;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .description {
      font-size: 14px;
      color: #444;
      line-height: 1.6;
      margin: 16px 0;
    }
    .alert {
      background-color: #ffebee;
      border-left: 5px solid #f44336;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      color: #b71c1c;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-block;
      background-color: #c62828;
      color: #ffffff;
      padding: 12px 20px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
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
      background-color: #fffafa;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="image-container">
      <img src="${post.media[0]}" alt="${post.username || "Campaign Image"}" />
      <div class="gradient-overlay"></div>
    </div>
    <div class="content">
      <h2>${post.name || "Post"}</h2>
      <div class="avatar" style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden;">
                <img src="${
                        author.profileImage
                    }" alt="Image" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
      
      <div class="subtext">Submitted by: ${author?.name || "User"} (${author?.email || "email not provided"})</div>
      <div class="subtext">Department: ${author?.department || "User"} (${author?.batch})</div>

      <div class="description">${
        post.text?.slice(0, 250) || "No description available."
      }...</div>

      <div class="alert">
        Unfortunately, your post submission was not approved.<br /><br />
        Please review our guidelines, revise your content, and feel free to resubmit. We're here to help you create successful campaigns!
      </div>

      <div style="text-align:center;">
        <a class="btn" href="${frontendUrl}/contact" target="_blank">Contact Support</a>
      </div>
    </div>
    <div class="footer">© 2025 mepconnect.org — All rights reserved.</div>
  </div>
</body>
</html>`;

    const message = {
      from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: options.message,
      text: options.text,
      html: htmlContent,
    };
    await transporter.sendMail(message);
    console.log("Post rejection email sent successfully!");
  } catch (error) {
    console.error("Error sending rejection email:", error);
  }
};

module.exports = { sendPostEmailVerified, sendPostEmailRemoved };
