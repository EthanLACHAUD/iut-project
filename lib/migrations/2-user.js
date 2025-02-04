'use strict';

exports.up = async function (knex) {
    await knex.schema.table('user', (table) => {
        table.string('role').defaultTo('user');
        table.json('scope');
    });
};

exports.down = async function (knex) {
    await knex.schema.table('user', (table) => {
        table.dropColumn('role');
        table.dropColumn('scope');
    });
};