import { User } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId })
      .select('-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt');

    if (!user || user.role !== 'artist') {
      return res.status(401).json({ success: false, message: 'Unauthorized Access' });
    }

    next();
  } catch (error) {
    console.log('Error verifying user:', error.message);
    res.status(500).json({ success: false, message: 'Could not verify user' });
  }
};
