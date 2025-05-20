import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookies = (res, userId, role) => {
  const token = jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const cookieName = 'userSession';

  res.cookie(cookieName, token, {
    path:'/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
