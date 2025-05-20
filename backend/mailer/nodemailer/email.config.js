import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sender ='"HypeDrop" <no-reply@hypedrop.com>'
;