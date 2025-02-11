'use strict';

const Joi = require('joi');
const Boom = require('@hapi/boom');

module.exports = [
    {
        method: 'post',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['user']
            },
            validate: {
                payload: Joi.object({
                    userId: Joi.number().integer().required(),
                    movieId: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const { userId, movieId } = request.payload;
            try {
                return await favoriteService.addFavorite(userId, movieId);
            } catch (err) {
                console.error('Error adding favorite:', err);
                if (err.message === 'Movie already in favorites') {
                    throw Boom.conflict('Movie already in favorites');
                }
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'delete',
        path: '/favorites/{movieId}',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['user']
            },
            validate: {
                params: Joi.object({
                    movieId: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    userId: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const { userId } = request.payload;
            const { movieId } = request.params;
            try {
                await favoriteService.removeFavorite(userId, movieId);
                return '';
            } catch (err) {
                console.error('Error removing favorite:', err);
                if (err.message === 'Movie not in favorites') {
                    throw Boom.notFound('Movie not in favorites');
                }
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    },
    {
        method: 'get',
        path: '/favorites',
        options: {
            tags: ['api'],
            auth: {
                strategy: 'jwt',
                scope: ['user']
            },
            validate: {
                query: Joi.object({
                    userId: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { favoriteService } = request.services();
            const { userId } = request.query;
            try {
                return await favoriteService.listFavorites(userId);
            } catch (err) {
                console.error('Error listing favorites:', err);
                throw Boom.internal('An internal server error occurred', err);
            }
        }
    }
];