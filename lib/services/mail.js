// lib/services/mail.js
'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');

module.exports = class MailService extends Service {
    async sendWelcomeEmail(user) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Welcome to Our Service',
            text: `Hello ${user.firstName},\n\nWelcome to our service! We are glad to have you with us.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailOptions);
    }

    async sendNewMovieNotification(user, movie) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'New Movie Added',
            text: `Hello ${user.firstName},\n\nA new movie titled "${movie.title}" has been added to our collection.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailOptions);
    }

    async sendMovieUpdatedNotification(user, movie) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: user.mail,
            subject: 'Favorite Movie Updated',
            text: `Hello ${user.firstName},\n\nThe movie titled "${movie.title}" in your favorites has been updated.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mailOptions);
    }
};