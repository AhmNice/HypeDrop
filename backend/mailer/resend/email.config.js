import dotenv from 'dotenv';
dotenv.config();
import { Resend } from 'resend';

export const resend = new Resend(`${process.env.RESEND_API_KEY}`);
export const sender = 'HypeDrop <onboarding@resend.dev>'; // You can use this without a domain
