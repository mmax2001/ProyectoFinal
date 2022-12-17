import { createTransport } from 'nodemailer';
import config from './config.js';

export const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
});


