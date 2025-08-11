const catchAsyncError = require('../middlewares/catchAsyncError');
const User= require('../models/user');
const sendResetPassword = require('../utils/emails/sendResetPassword');
const forgotpassword=catchAsyncError(async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found with this email' });
      }
  
      const resetToken = user.getResetToken();
      await user.save({ validateBeforeSave: false });
  
      const resetURL = `${process.env.FRONTEND_URI}/request/resetpassword/${resetToken}`;
      await sendResetPassword(user.email, user.name, resetURL);
      res.status(200).json({ message: 'Reset password link generated.', resetURL });
    } catch (error) {
      console.error('Error in reset password request:', error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  })

  const resetpassword=catchAsyncError(async (req, res) => {
    const hashedToken = req.params.token;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const { salt, hashedPassword } = user.hashPassword(password);
      user.password = hashedPassword;
      user.salt = salt;
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful. You can now login.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    }
  })
  module.exports={resetpassword,forgotpassword}