import { User } from '../models/user.model.js';

export const checkAuth = async (req, res, next) => {
  try {
    // Ensure req.userId and req.role are properly set, typically from a JWT middleware
    const user = await User.findOne({
      _id: req.userId,
      role: req.role,
    }).select('-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized User' });
    }
    // console.log(req.userId ||'not provided')
    // Attach user to the request object for future use in routes
    req.user = user;

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.log('Error checking authentication:', error.message);
    res.status(500).json({ success: false, message: 'Could not check authentication' });
  }
};
 