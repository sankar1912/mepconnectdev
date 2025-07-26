const nodemailer = require("nodemailer");

const sendSuccessEmail = async (options) => {
  const frontendUrl = process.env.FRONTEND_URI;

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
      <meta charset="UTF-8">
      <title>MepConnect - Account Verified</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        .container {
          max-width: 620px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(90deg, #1e7e34, #28a745);
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: #fff;
          font-size: 24px;
        }
        .header p {
          margin: 8px 0 0;
          color: #d4edda;
          font-size: 14px;
        }
        .content {
          padding: 30px 25px;
        }
        .content h2 {
          margin-top: 0;
          font-size: 22px;
          color: #28a745;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
        }
        .cta-button {
          display: inline-block;
          margin-top: 25px;
          background-color: #28a745;
          color: #fff;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
        }
        .support-box {
          margin-top: 30px;
          background-color: #f1f3f4;
          padding: 16px 20px;
          border-radius: 6px;
          font-size: 14px;
        }
        .footer {
          padding: 20px;
          text-align: center;
          background-color: #f0f0f0;
          font-size: 13px;
          color: #777;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to MepConnect!</h1>
          <p>Your Mepco Alumni Portal</p>
        </div>
        <div class="content">
          <h2>✅ Account Verified Successfully</h2>
          <p>Dear Alumnus,</p>
          <p>We're thrilled to inform you that your account has been verified on <strong>MepConnect</strong>, the official alumni platform of <strong>Mepco Schlenk Engineering College</strong>.</p>
          <p>You can now:</p>
          <ul>
            <li>Reconnect with fellow alumni</li>
            <li>Access exclusive alumni events</li>
            <li>Explore career and mentoring opportunities</li>
            <li>Share memories and stay involved</li>
          </ul>
          <a href="${frontendUrl}" class="cta-button">Go to Dashboard</a>

          <div class="support-box">
            <p><strong>Need Help?</strong><br>
            For support or questions, feel free to reach out:</p>
            <p>
              <strong>Name:</strong> Sankara Narayanan K<br>
              <strong>Email:</strong> <a href="mailto:mepconnectdev@gmail.com">mepconnectdev@gmail.com</a><br>
              <strong>Phone:</strong> <a href="tel:+917402015715">+91 74020 15715</a>
            </p>
          </div>
        </div>
        <div class="footer">
          &copy; 2025 MepConnect.org | Powered by Mepco Alumni Association<br>
          Mepco Schlenk Engineering College, Sivakasi
        </div>
      </div>
    </body>
    </html>
    `;

    const message = {
      from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.email,
      subject: "🎉 Your MepConnect Account Has Been Verified!",
      text: `Hi,

Your account on MepConnect (mepconnect.org) has been successfully verified!

You can now access your alumni dashboard:
${frontendUrl}

Stay connected, share memories, and grow together.

For support:
Name: Sankara Narayanan K
Email: mepconnectdev@gmail.com
Phone: +91 7402015715

Regards,
MepConnect Team
`,
      html: htmlContent,
    };

    await transporter.sendMail(message);
    console.log("✅ Verification email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
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
