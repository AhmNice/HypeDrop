import { USER_PASSWORD_RESET_REQUEST_TEMPLATE, USER_PASSWORD_RESET_SUCCESS_TEMPLATE, USER_VERIFICATION_EMAIL_TEMPLATE, USER_WELCOME_EMAIL_TEMPLATE } from '../userEmailTemplates.js'
import { transporter, sender } from './email.config.js'
export const sendVerificationEmail_user = async (email, verificationToken) => {
  const recipient = email
  try {
    const mailOption ={
      from: sender,
      to: recipient,
      subject: 'Account Verification',
      html: USER_VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
    }
    await transporter.sendMail(mailOption, (error, info)=>{
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    })
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email')
  }
}
export const sendUserWelcomeEmail = async (email, username) => {
  const recipient = email
  try {
    const mailOption ={
      from: sender,
      to: recipient,
      subject: 'Welcome Email',
      html: USER_WELCOME_EMAIL_TEMPLATE.replace('{username}', username)
    }
    await transporter.sendMail(mailOption, (error, info)=>{
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    })
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email')
  }
}
export const sendForgetPasswordEmail = async (email, link) => {
  const recipient = email
  try {
    const mailOption ={
      from: sender,
      to: recipient,
      subject: 'Password Reset Email',
      html: USER_PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', link)
    }
    await transporter.sendMail(mailOption, (error, info)=>{
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    })
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email')
  }
}
export const sendPasswordResetSuccessEmail = async (email, username) => {
  const recipient = email
  try {
    const mailOption ={
      from: sender,
      to: recipient,
      subject: 'Password Reset Success Email',
      html: USER_PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{username}', username)
    }
    await transporter.sendMail(mailOption, (error, info)=>{
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    })
  } catch (error) {
    console.error('Error sending verification email:', error.message);
    throw new Error('Failed to send verification email')
  }
}