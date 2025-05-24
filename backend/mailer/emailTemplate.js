// hypeDropArtistEmailTemplates.ts

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your HypeDrop Artist Account</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">HypeDrop Artist Verification</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hey there,</p>
    <p>Thanks for joining HypeDrop as an artist! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #7D00FF;">{verificationCode}</span>
    </div>
    <p>Enter this code to verify your artist profile and start posting your music snippets.</p>
    <p>This code expires in 24 hours. Didn’t sign up? You can ignore this email.</p>
    <p>Keep the drops coming,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. Please don’t reply.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
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
    <p>You’re officially part of the HypeDrop artist community!</p>
    <p>Here's what you can start doing right now:</p>
    <ul>
      <li>Post music snippets to build anticipation</li>
      <li>Engage fans and collect early feedback</li>
      <li>Notify your followers the moment a full track drops</li>
    </ul>
    <p>We’re here to help you share your sound and grow your fanbase.</p>
    <p>Let the hype begin! 🎶</p>
    <p>Cheers,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. Please don’t reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
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
    <p>You requested to reset the password for your HypeDrop artist account.</p>
    <p>Click below to proceed:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #7D00FF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link is valid for 1 hour. If you didn’t request this, just ignore the message.</p>
    <p>Keep creating,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. Please don’t reply.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Successfully Changed</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Updated</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hi {username},</p>
    <p>Your HypeDrop artist account password was successfully updated.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #7D00FF; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you didn’t authorize this, please contact our support immediately.</p>
    <p>Security tips:</p>
    <ul>
      <li>Choose a strong, unique password</li>
      <li>Enable two-factor authentication (if available)</li>
    </ul>
    <p>Keep rocking,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. Please don’t reply.</p>
  </div>
</body>
</html>
`;

export const SNIPPET_NOTIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Snippet from Artist You Follow</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">New Snippet Drop from {artistName}!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {username},</p>
    <p>Good news! An artist you follow, <strong>{artistName}</strong>, has just released a new snippet titled {snippetTitle}</p>
    <p>Check out the snippet and get ready for the full track:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{snippetURL}" style="background-color: #7D00FF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Listen to the Snippet</a>
    </div>
    <p>Stay tuned! We'll notify you when the full song drops.</p>
    <p>Best regards,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;
export const SONG_RELEASE_REMINDER_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Song Is Live — Add a Link for Your Fans!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #7D00FF, #BB00FF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Your Track Is Out!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hey {artistName},</p>
    <p>Awesome news! Your track "<strong>{songTitle}</strong>" has officially dropped.</p>
    <p>To keep the momentum going and make sure fans can listen instantly, please update or add a link to the full song. This will appear when fans revisit your snippet page.</p>
    <p>It only takes a few seconds and ensures your audience has direct access to your music.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{updateSongLinkURL}" style="background-color: #7D00FF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Update Song Link</a>
    </div>
    <p>Let your snippet lead to streams, follows, and shares!</p>
    <p>Keep dropping heat,<br>The HypeDrop Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from HypeDrop. No need to reply.</p>
  </div>
</body>
</html>
`;
