'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Favorite extends Model {
    static get tableName() {
        return 'favorites';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().required(),
            movieId: Joi.number().integer().required()
        });
    }

    static get relationMappings() {
        const Movie = require('./movie');

        return {
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movie,
                join: {
                    from: 'favorites.movieId',
                    to: 'movies.id'
                }
            }
        };
    }
};