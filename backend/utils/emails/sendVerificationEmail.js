const nodemailer = require('nodemailer');

const sendVerificationEmail = async ({ user, token, email, url }) => {
   const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: process.env.SMTP_PORT,
              auth: {
                  user: process.env.SMTP_MAIL,
                  pass: process.env.SMTP_SECRET,
              },
          });

  const mailOptions = {
    from: `"Mepco Alumni Association" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Verify Your Email - Mepco Alumni',
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
      <div style="max-width: 600px; background-color: #fff; margin: auto; border-radius: 10px; padding: 40px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
        <div style="text-align: center;">
          <img src="https://mepconnect.org/static/logo.png" alt="Mepco Logo" style="height: 80px;" />
          <h2 style="color: #0d47a1;">Welcome to MepConnect</h2>
          <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>
          <p style="font-size: 15px; color: #555;">
            Thank you for joining the Mepco Schlenk Engineering College Alumni Network. To complete your registration, please verify your email by clicking the button below:
          </p>
          <a href="${url}" style="display: inline-block; background: linear-gradient(to right, #0d47a1, #1976d2); color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px;">
            Verify Email
          </a>
          <p style="font-size: 14px; color: #777; margin-top: 30px;">
            If you did not create an account, you can safely ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 13px; color: #999;">
            This email was sent by the Alumni Association of Mepco Schlenk Engineering College.<br>
            <a href="https://mepconnect.org" style="color: #0d47a1;">Visit Website</a> | <a href="mailto:support@mepconnect.org" style="color: #0d47a1;">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Email sending failed');
  }
};

module.exports = sendVerificationEmail;
