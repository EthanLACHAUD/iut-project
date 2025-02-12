'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');
const { createTransport } = require('nodemailer');
const { join } = require('node:path');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

module.exports = [
    {
        method: 'post',
        path: '/movies',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                payload: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    releaseDate: Joi.date().required(),
                    director: Joi.string().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                return await movieService.create(request.payload);
            } catch (err) {
                console.error('Error creating movie:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'patch',
        path: '/movies/{id}',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    title: Joi.string(),
                    description: Joi.string(),
                    releaseDate: Joi.date(),
                    director: Joi.string()
                }).min(1)
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                return await movieService.updateById(request.params.id, request.payload);
            } catch (err) {
                console.error('Error updating movie:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'delete',
        path: '/movies/{id}',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                await movieService.deleteById(request.params.id);
                return '';
            } catch (err) {
                console.error('Error deleting movie:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'get',
        path: '/movies',
        options: {
            tags: ['api'],
            auth: false
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            try {
                return await movieService.list();
            } catch (err) {
                console.error('Error listing movies:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'post',
        path: '/movies/export',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const { email } = request.auth.credentials;

            try {
                // Fetch movies from the database
                const movies = await movieService.list();

                // Generate CSV file
                const csvWriter = createObjectCsvWriter({
                    path: join(__dirname, 'movies.csv'),
                    header: [
                        { id: 'id', title: 'ID' },
                        { id: 'title', title: 'Title' },
                        { id: 'description', title: 'Description' },
                        { id: 'releaseDate', title: 'Release Date' },
                        { id: 'director', title: 'Director' }
                    ]
                });
                await csvWriter.writeRecords(movies);

                // Send email with CSV attachment
                const transporter = createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS
                    }
                });

                const mailOptions = {
                    from: process.env.MAIL_FROM,
                    to: email,
                    subject: 'Movies CSV Export',
                    text: 'Please find the attached CSV file containing the list of movies.',
                    attachments: [
                        {
                            filename: 'movies.csv',
                            path: join(__dirname, 'movies.csv')
                        }
                    ]
                };

                await transporter.sendMail(mailOptions);

                // Clean up the CSV file
                fs.unlinkSync(join(__dirname, 'movies.csv'));

                return h.response({ message: 'CSV export request received. You will receive an email shortly.' }).code(202);
            } catch (err) {
                console.error('Error processing CSV export:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    }
];