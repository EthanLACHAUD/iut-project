'use strict';

const Joi = require('joi');
const Encrypt = require('@r6a.05/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = [
    {
        method: 'post',
        path: '/user',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().required().min(8).example('password').description('Password of the user'),
                    mail: Joi.string().required().email().example('John.Doe@mail.com').description('Mail of the user'),
                    username: Joi.string().required().min(3).example('JohnDoe').description('Username of the user')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { userService } = request.services();
                const hashedPassword = Encrypt.sha1(request.payload.password);
                const userPayload = { ...request.payload, password: hashedPassword, scope: ['user'] };                return await userService.create(userPayload);
            } catch (err) {
                console.error('Error creating user:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'get',
        path: '/user',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['user', 'admin']
            }
        },
        handler: async (request, h) => {
            const { userService } = request.services();
            return await userService.list();
        }
    },
    {
        method: 'delete',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { userService } = request.services();
                await userService.deleteById(request.params.id);
                return '';
            } catch (err) {
                console.error('Error deleting user:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'patch',
        path: '/user/{id}',
        options: {
            tags: ['api'],
            auth: {
                scope: ['admin']
            },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().description('ID of the user')
                }),
                payload: Joi.object({
                    firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                    lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                    password: Joi.string().min(8).example('password').description('Password of the user'),
                    mail: Joi.string().email().example('John.Doe@mail.com').description('Mail of the user'),
                    username: Joi.string().min(3).example('JohnDoe').description('Username of the user'),
                    scope: Joi.array().items(Joi.string()).example(['user', 'admin']).description('Scopes of the user')
                }).min(1)
            }
        },
        handler: async (request, h) => {
            try {
                const { userService } = request.services();
                const updatePayload = { ...request.payload };
                if (updatePayload.password) {
                    updatePayload.password = Encrypt.sha1(updatePayload.password);
                }

                return await userService.updateById(request.params.id, updatePayload);
            } catch (err) {
                console.error('Error updating user:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'post',
        path: '/user/login',
        options: {
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    mail: Joi.string().required().email().example('John.Doe@mail.com').description('Mail of the user'),
                    password: Joi.string().required().min(8).example('password').description('Password of the user')
                })
            }
        },
        handler: async (request, h) => {
            try {
                const { userService } = request.services();
                const user = await userService.findByMail(request.payload.mail);
                if (!user) {
                    throw Boom.unauthorized('Invalid email or password');
                }

                const isValidPassword = Encrypt.compareSha1(request.payload.password, user.password);
                if (!isValidPassword) {
                    throw Boom.unauthorized('Invalid email or password');
                }

                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.mail,
                        scope: user.scope || ['user'] // Ensure the correct scope is included
                    },
                    {
                        key: 'random_string',
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );

                return { token };
            } catch (err) {
                console.error('Error logging in user:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    }
];