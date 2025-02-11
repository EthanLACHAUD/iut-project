'use strict';

const { Model } = require('@hapipal/schwifty');
const Joi = require('joi');

module.exports = class Movie extends Model {
    static get tableName() {
        return 'movies';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().required(),
            description: Joi.string().required(),
            releaseDate: Joi.date().required(),
            director: Joi.string().required(),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    $beforeUpdate() {
        this.updatedAt = new Date();
    }
};