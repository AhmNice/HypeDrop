
import {
  USER_PASSWORD_RESET_REQUEST_TEMPLATE,
  USER_PASSWORD_RESET_SUCCESS_TEMPLATE,
  USER_VERIFICATION_EMAIL_TEMPLATE,
  USER_WELCOME_EMAIL_TEMPLATE
} from '../userEmailTemplates.js';

import { resend, sender } from './email.config.js';

export const sendVerificationEmail_user = async (email, verificationToken) => {
  try {
   const res =  await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Account Verification',
      html: USER_VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
    });
    console.log('Verification email sent!', res);
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw new Error('Email send error');
  }
};

export const sendUserWelcomeEmail = async (email, username) => {
  try {
    await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Welcome Email',
      html: USER_WELCOME_EMAIL_TEMPLATE.replace('{username}', username),
    });
    console.log('Welcome email sent!');
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw new Error('Email send error');
  }
};

export const sendForgetPasswordEmail = async (email, link) => {
  try {
   const res=  await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Password Reset Email',
      html: USER_PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', link),
    });
    console.log('Password reset request email sent!');
  } catch (error) {
    console.error('Failed to send password reset request:', error);
    throw new Error('Email send error');
  }
};

export const sendPasswordResetSuccessEmail = async (email, username) => {
  try {
    await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Password Reset Success Email',
      html: USER_PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{username}', username),
    });
    console.log('Password reset success email sent!');
  } catch (error) {
    console.error('Failed to send password reset success:', error);
    throw new Error('Email send error');
  }
};
