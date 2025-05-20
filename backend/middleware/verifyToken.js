import jwt from 'jsonwebtoken';

export const verifyUserToken = (req, res, next) => {
  try {
    const token = req.cookies.userSession;
    // console.log(token)
    // Check if token is provided
    if (!token) {
      return res.status(401).json({ success: false, message: 'User token not provided' });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded data to the request object
    req.userId = decoded.userId;
    req.role = decoded.role;
    // console.log(decoded.userId)
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Log specific error for debugging (in development only)
    if (process.env.NODE_ENV !== 'production') {
      console.error('User token error:', error.message);
    }

    // Check if token is expired
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: 'User token has expired' });
    }

    // Generic invalid token error
    return res.status(401).json({ success: false, message: 'Invalid or expired user token' });
  }
};
