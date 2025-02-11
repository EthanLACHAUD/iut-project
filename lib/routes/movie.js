'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

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
    }
];