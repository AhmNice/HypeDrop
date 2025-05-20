import bcrypt from 'bcryptjs';
import { sendPasswordResetSuccessEmail } from '../mailer/nodemailer/emails.js';
import { Admin } from '../models/admin.model.js';
import { Artist } from '../models/artist.model.js';
import { User } from '../models/user.model.js';
import { generateResetPasswordToken } from '../utils/generateResetPasswordToken.js';
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';
import { generateVerificationCode } from '../utils/generateVerificationToken.js';
import { sendResetPasswordEmail, sendVerificationEmail, sendWelcomeEmail } from '../utils/sendEmails.js';
export const adminSignUp = async (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;
  const existInArtist = await Artist.findOne({email})
      const existInUser = await User.findOne({email})
      const existInAdmin = await Admin.findOne({email})
      if(existInAdmin || existInArtist || existInUser) return res.status(400).json({success:false, message:'Email already in use'});
      if(!userName || !email || !password || !phoneNumber) return res.status(400).json({success:false, message:'All fields are required'})
        try {
          const code = generateVerificationCode()
          const hashedPassword = await bcrypt.hash(password, 10)
          const admin = new Admin({
            userName,
            email,
            phoneNumber,
            password:hashedPassword,
            verificationToken: code,
            verificationTokenExpiresAt:Date.now() + 24*60*60*1000
          })
          await admin.save()
          console.log('Admin created successfully')
          //jwt
          generateTokenAndSetCookies(res, admin._id, 'admin');
          //sending verification email
          // const link = `${req.protocol}://${req.get('host')}/api/v1/admin/verify/${admin._id}/${code}`
          await sendVerificationEmail(admin.email, code)
          console.log('Verification email sent successfully')
          res.status(201).json({success:true, message:'Account created successfully', admin:{
            ...admin._doc,
            password:undefined,
            verificationToken:undefined,
            verificationTokenExpiresAt:undefined,
            resetPasswordToken:undefined,
            resetPasswordExpiresAt:undefined
          }})
        } catch (error) {
          console.log('Error creating account', error.message)
          res.status(500).json({success:false, message:'Could not create account'})
        }
}
export const adminLogin = async(req, res)=>{
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({success:false, message:'All fields are required'})
  try {
    const admin = await Admin.findOne({ email });
    if(!admin) return res.status(400).json({success:false, message:'Admin not found'})
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if(!isPasswordValid) return res.status(400).json({success:false, message:'Invalid password'});
    if(!admin.isVerified)return res.status(400).json({message:'Please verify you account'})
    //jwt
    generateTokenAndSetCookies(res, admin._id, 'admin')
    res.status(200).json({success:true, message:'Login successful', user:{
      ...admin._doc,
      password:undefined,
      verificationToken:undefined,
      verificationTokenExpiresAt:undefined,
      resetPasswordToken:undefined,
      resetPasswordExpiresAt:undefined
    }})
  } catch (error) {
    console.log('Error logging in:', error.message);
    res.status(500).json({ success: false, message: 'Could not login' });
  }
}
export const adminVerify = async(req, res)=>{
  console.log('verifying account')
  const { code } = req.body
  try {
    const adminAccount = await Admin.findOne({verificationToken:code, verificationTokenExpiresAt:{$gt:Date.now()}});
    if(!adminAccount) return res.status(400).json({success:false, message:'Invalid or expired verification code'})
    adminAccount.isVerified = true;
    adminAccount.verificationToken= undefined,
    adminAccount.verificationTokenExpiresAt= undefined
    await adminAccount.save()
    await sendWelcomeEmail(adminAccount.email, adminAccount.userName)
    console.log('Account verified successfully')
    res.status(200).json({success:true, message:'Account verified successfully'})

  } catch (error) {
    console.log("Error verifying code", error.message)
    res.status(500).json({success:false, message:'Could not verify code'})
  }
}
export const adminForgetPassword = async(req, res)=>{
  const { email } = req.body
  if(!email) return res.status(400).json({success:false, message:'Email is required'});
  try {
    const isValidEmail = await Admin.findOne({email});
    if(!isValidEmail) return res.status(400).json({success:false, message:'Invalid email'});
    const resetPasswordToken = generateResetPasswordToken()
    const resetPasswordExpiresAt = Date.now() + 15 *60*1000 // 15 minutes

    isValidEmail.resetPasswordToken = resetPasswordToken;
    isValidEmail.resetPasswordExpiresAt = resetPasswordExpiresAt;
    await isValidEmail.save()

    //sending reset email
    const link = `${process.env.CLIENT_URL}/reset-password-admin/${resetPasswordToken}`
    await sendResetPasswordEmail(isValidEmail.email, link)
    console.log('Reset password email sent successfully')
    res.status(200).json({success:true, message:'Reset password email sent successfully'})

  } catch (error) {
    console.log('Error sending reset password email:', error.message);
    res.status(500).json({success:false, message:'Could not send reset password email'})
  }
}
export const adminResetPassword = async(req, res)=>{
  const { token, password } = req.body
  if(!token || !password) return res.status(400).json({success:false, message:'All fields are required'})
    try {
      const admin = await Admin.findOne({
        resetPasswordToken:token,
        resetPasswordExpiresAt:{$gt:Date.now()}
      })
      if(!admin)return res.status(400).json({success:false, message:'Invalid or expired token'});
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
      await admin.save();
      res.status(200).json({success:true, message:'Password reset successfully'})
      //sending password reset success email
      await sendPasswordResetSuccessEmail(admin.email, admin.userName)
      console.log('Password reset success email sent successfully')
    } catch (error) {
      console.log('Error resetting password:', error.message);
      res.status(500).json({success:false, message:'Could not reset password'})
    }
}
export const adminLogout = async(req, res)=>{
  res.clearCookie('adminSession')
  console.log('Admin logged out successfully')
  res.status(200).json({success:true, message:'Logged out successfully'})
}
export const adminAuthCheck = async (req, res,next) => {
  try {
    const admin = await Admin.finOne({
      _id:req.userId,
      role:req.role
    })
    if(!admin) return res.status(401).json({success:false, message:'Unauthorized access'});
    console.log('Admin authenticated:', admin._id, admin.role);
    next()
  } catch (error) {
    console.error('Error checking admin authentication:', error.message);
    res.status(500).json({ success: false, message: 'Could not check admin authentication' });

  }
}
export const sendAuthenticatedAccount = async(req, res)=>{
  try {
    const admin = await Admin.findOne({
      _id:req.userId,
      role:req.role
    }).select('-password -verificationToken -verificationTokenExpiresAt -resetPasswordToken -resetPasswordExpiresAt')
    if(!admin) return res.status(401).json({success:false, message:'Unauthorized access'});
    res.status(200).json({success:true, message:'Admin is authenticated', user:{
      ...admin._doc,
      password:undefined,
      verificationToken:undefined,
      verificationTokenExpiresAt:undefined,
      resetPasswordToke:undefined,
      resetPasswordExpiresAt:undefined
    }})
  } catch (error) {
    console.error('Error sending authenticated account:', error.message);
    res.status(500).json({ success: false, message: 'Could not send authenticated account' });
  }
}