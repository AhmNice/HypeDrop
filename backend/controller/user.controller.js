import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { generateResetPasswordToken } from '../utils/generateResetPasswordToken.js';
import { generateVerificationCode } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { sendUserWelcomeEmail, sendForgetPasswordEmail, sendPasswordResetSuccessEmail, sendVerificationEmail_user } from '../mailer/nodemailer/emails.js';
import { handleImageUpload } from '../utils/pictureUploader.js';
import path from 'path'
import { Notification } from '../models/notification.model.js';
import { title } from 'process';
export const userRegistration = async (req, res) => {
  const {
    email,
    password,
    role,
    userName,
    phoneNumber,
    fullName,
    stageName,
  } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Some required fields are empty' });
  }

  if (role === 'user' && (!userName || !phoneNumber)) {
    return res.status(400).json({ success: false, message: 'Some required fields for user account are empty' });
  }

  if (role === 'artist' && (!fullName || !stageName)) {
    return res.status(400).json({ success: false, message: 'Some required fields for artist account are empty' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationCode();
    const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    const user = new User({
      email,
      password: hashedPassword,
      role,
      fullName,
      userName,
      phoneNumber,
      stageName,
      verificationToken,
      verificationTokenExpiresAt,
    });

    await user.save();
    // set cookies
    generateTokenAndSetCookies(res, user._id, user.role);
    //sending verification email
    await sendVerificationEmail_user(user.email, verificationToken)

    return res.status(201).json({ success: true, message: 'Account created, proceed to account verification' });
  } catch (error) {
    console.log('Error creating account:', error.message);
    res.status(500).json({ success: false, message: 'Could not create account' });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const passwordIsVerified = await bcrypt.compare(password, isUser.password);
    if (!passwordIsVerified) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    generateTokenAndSetCookies(res, isUser._id, isUser.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...isUser._doc,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined
      }
    });
  } catch (error) {
    console.log('Error logging user:', error.message);
    res.status(500).json({ success: false, message: 'Could not login user' });
  }
};
export const emailVerification = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Code cannot be empty' });
  }

  try {
    const isUser = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!isUser) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    isUser.verificationToken = undefined;
    isUser.verificationTokenExpiresAt = undefined;
    isUser.isVerified = true;

    await isUser.save();

    generateTokenAndSetCookies(res, isUser._id, isUser.role);

    let name = isUser.userName || isUser.stageName || 'User';
    await sendUserWelcomeEmail(isUser.email, name);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...isUser._doc,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined
      }
    });
  } catch (error) {
    console.log('Error verifying account:', error.message);
    res.status(500).json({ success: false, message: 'Could not verify account' });
  }
};
export const userForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    const resetPasswordToken = generateResetPasswordToken();
    const resetPasswordExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    isUser.resetPasswordToken = resetPasswordToken;
    isUser.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await isUser.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password-user/${resetPasswordToken}`;

    try {
      await sendForgetPasswordEmail(isUser.email, resetURL);
    } catch (error) {
      console.log('Error sending reset password email:', error.message);
      return res.status(500).json({ success: false, message: 'Could not send reset password email' });
    }

    res.status(200).json({ success: true, message: 'Reset password link sent successfully' });
  } catch (error) {
    console.log('Error requesting password reset:', error.message);
    res.status(500).json({ success: false, message: 'Could not request password reset' });
  }
};
export const userResetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ success: false, message: 'Token and new password are required' });
  }

  try {
    const isUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!isUser) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    isUser.resetPasswordToken = undefined;
    isUser.resetPasswordExpiresAt = undefined;
    isUser.password = await bcrypt.hash(password, 10);

    await isUser.save();

    const name = isUser.userName || isUser.stageName || 'User';
    await sendPasswordResetSuccessEmail(isUser.email, name);

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.log('Error resetting user password:', error.message);
    res.status(500).json({ success: false, message: 'Could not reset password' });
  }
};
export const userLogout = async (req, res) => {
  try {
    res.clearCookie('userSession', {
      path: '/',
      httpOnly: true,
      secure: true, // or false, depending on how it was set
      sameSite: 'Strict', // or 'Lax' or 'None'
    });
    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.log('Error Logging out:', error.message);
    res.status(500).json({ success: false, message: 'Could logout user' });
  }
}
export const sendAuthenticatedAccount = async (req, res) => {
  try {
    const isUser = await User.findOne({
      _id: req.userId,
      role: req.role,
    }).select('-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt');
    if (!isUser) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({
      success: true,
      user: isUser,
    });
  } catch (error) {
    console.log('Error sending authenticated account:', error.message);
    res.status(500).json({ success: false, message: 'Could not send authenticated account' });
  }
};
export const updateProfilePicture = async (req, res) => {
  try {
    const file = await handleImageUpload(req, res);
    const { id } = req.body
    if (!file) {
      return res.status(400).json({ message: 'No file selected' })
    }
    const relativePath = path.relative('backend', file.path)
    const isUser = await User.findOne({ _id: id })
    if (!isUser) return res.status(400).json({ success: false, message: 'Invalid user' })
    isUser.profilePicture = relativePath
    await isUser.save()
    res.status(200).json({
      success: true,
      message: 'Profile picture updated successfully'
    })
  } catch (err) {
    console.error('Error uploading file:', err.message);
    return res.status(500).json({ message: err.message });
  }
}
export const updateProfile = async (req, res) => {
  const { stageName, bio, email, socials, id } = req.body;

  if (!id) return res.status(400).json({ success: false, message: 'User id is required' });
  if (!stageName && !bio && !email && !socials)
    return res.status(400).json({ success: false, message: 'At least one field is required' });

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (stageName) user.stageName = stageName;
    if (bio) user.bio = bio;
    if (email) user.email = email;

    if (socials) {
      for (const [platform, url] of Object.entries(socials)) {
        user.socials[platform] = url;
      }
      user.markModified('socials');
    }

    await Promise.all([
      user.save(),
      new Notification({
        user: id,
        title: 'Account update',
        message: 'Your profile has been updated successfully',
        link: '/profile',
        type: 'profile'
      }).save()
    ]);

    return res.status(200).json({ success: true, message: 'Your profile has been updated' });

  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ success: false, message: 'Could not update your profile' });
  }
};
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  if (!currentPassword || !newPassword || !userId) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!',
    });
  } catch (error) {
    console.error('Error occurred while trying to change password:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
export const updateDisplayNameOrEmail = async (req, res) => {
  const { userId, email, displayName } = req.body
  if (!email && !displayName) {
    return res.status(400).json({
      success: false,
      message: 'No field to update'
    });
  }
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'user id is required'
    });
  }
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({
        success:false,
        message:'User not found'
      })
    }
    if(displayName) {user.displayName = displayName}
    if(email) {user.email = email}
    user.updatedAt = Date.now()
    await user.save()

    res.status(200).json({
      success:true,
      message:'Updated successfully'
    })
  } catch (error) {
    console.log('Error occurred while trying to update fields')
    res.status(500).json({
      success:false,
      message:'Internal server error'
    });
  }
}
