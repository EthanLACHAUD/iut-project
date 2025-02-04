'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {
        return 'user';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().min(8).example('password').description('Password of the user'),
            mail: Joi.string().email().example('John.Doe@mail.com').description('Mail of the user'),
            username: Joi.string().min(3).example('JohnDoe').description('Username of the user'),
            role: Joi.string().default('user').description('Role of the user'),
            scope: Joi.array().items(Joi.string()).default(['user']).description('Scopes of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = this.scope || ['user'];
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};