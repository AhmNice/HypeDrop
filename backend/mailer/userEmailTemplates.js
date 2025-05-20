export const USER_VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your HypeDrop Account</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">HypeDrop Verification</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hey there,</p>
    <p>Welcome to HypeDrop! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #7D00FF;">{verificationCode}</span>
    </div>
    <p>Use this code to verify your account and start discovering fresh drops.</p>
    <p>This code expires in 15 minutes. Didn’t sign up? Just ignore this email.</p>
    <p>Stay hyped,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;

export const USER_WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to HypeDrop</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to HypeDrop, {username}!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>We’re thrilled to have you in the HypeDrop community.</p>
    <p>Explore music previews and track what’s dropping soon.</p>
    <p>If you ever need help or have feedback, hit us up anytime.</p>
    <p>Let’s get the hype started! 🎧</p>
    <p>Cheers,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;

export const USER_PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your HypeDrop Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your HypeDrop password.</p>
    <p>Click below to proceed:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #7D00FF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't make this request, you can safely ignore this email.</p>
    <p>– The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;

export const USER_PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Changed</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi {username},</p>
    <p>Your HypeDrop password was successfully updated.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #7D00FF; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If this wasn’t you, please contact us immediately.</p>
    <p>Security tips:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable 2FA if available</li>
    </ul>
    <p>Stay safe,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;
