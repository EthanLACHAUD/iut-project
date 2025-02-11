'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {
    async sendWelcomeEmail(user) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'khalid.rosenbaum35@ethereal.email',
                pass: 'y8Hup4fDZJBAEREaGq'
            }
        });

        const mailOptions = {
            from: 'khalid.rosenbaum35@ethereal.email',
            to: user.mail,
            subject: 'Welcome to Our Service',
            text: `Hello ${user.firstName},\n\nWelcome to our service! We are glad to have you with us.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailOptions);
    }
};