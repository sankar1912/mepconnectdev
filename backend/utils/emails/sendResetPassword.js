const nodemailer = require('nodemailer');

const sendResetPassword = async (email, name, resetURL) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
               host: process.env.SMTP_HOST,
               port: process.env.SMTP_PORT,
               auth: {
                   user: process.env.SMTP_MAIL,
                   pass: process.env.SMTP_SECRET,
               },
           });

    const mailOptions = {
      from: `"Alumni Portal" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Reset Your Password in mepconnect.org',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #eee;">
          <h2 style="color: #1976d2;">Hi ${name},</h2>
          <p style="font-size: 16px; color: #333;">
            We received a request to reset your password for your Alumni Portal account.
          </p>
          <p style="font-size: 16px; color: #333;">
            If you made this request, please click the button below to reset your password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" style="background-color: #1976d2; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">Reset Password</a>
          </div>
          <p style="font-size: 14px; color: #777;">
            Or copy and paste the following URL into your browser:
            <br />
            <a href="${resetURL}" style="color: #1976d2;">${resetURL}</a>
          </p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa;">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
          </p>
          <p style="font-size: 12px; color: #aaa;">
            This link will expire in 30 minutes.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
    throw new Error('Failed to send reset password email.');
  }
};

module.exports = sendResetPassword;
