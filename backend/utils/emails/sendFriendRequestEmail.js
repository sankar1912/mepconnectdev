const nodemailer = require('nodemailer');

const sendFriendRequestEmail = async (toEmail, requesterName, user) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_SECRET,
        }
    });

    const mailOptions = {
        from: `${process.env.SMTP_FROM_USER} <${process.env.SMTP_FROM_EMAIL}>`,
        to: toEmail,
        subject: `${requesterName} wants to connect with you on mepconnect!`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #fafafa;">
                <h2 style="color: #0073b1;">${requesterName} sent you a friend request</h2>
                <p style="font-size: 16px;">Here's a quick glance at their profile on <strong>mepconnect.org</strong>:</p>
                
                <div style="display: flex; align-items: center; background-color: #fff; padding: 16px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); margin-top: 20px;">
                    <img src="${user.profileImage}" alt="${user.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid #0073b1; margin-right: 20px;">
                    <div>
                        <h3 style="margin: 0; font-size: 20px; color: #333;">${user.name}</h3>
                        <p style="margin: 4px 0; color: #555;"><strong>${user.department}</strong> at ${user.batch}</p>
                        <p style="margin: 2px 0; color: #777;">🏠 ${user.place}</p>
                    </div>
                </div>

                <div style="margin: 30px 0; text-align: center;">
                    <a href="${process.env.FRONTEND_URI}" style="background-color: #0073b1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                        View Request & Connect
                    </a>
                </div>

                <p style="font-size: 14px; color: #666;">This message was intended for you. If you believe this was sent in error, you can ignore it.</p>
                <hr style="margin: 30px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    © ${new Date().getFullYear()} mepconnect.org, Inc. All rights reserved.<br>
                    123 MyApp St, Tech City, Innovation Land
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Friend request email sent to ${toEmail}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendFriendRequestEmail;
