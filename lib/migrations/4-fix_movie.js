'use strict';

exports.up = async function (knex) {
    const hasCreatedAtColumn = await knex.schema.hasColumn('movies', 'createdAt');
    const hasUpdatedAtColumn = await knex.schema.hasColumn('movies', 'updatedAt');
    await knex.schema.table('movies', (table) => {
        if (!hasCreatedAtColumn) {
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        }
        if (!hasUpdatedAtColumn) {
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        }
    });
};

exports.down = async function (knex) {
    await knex.schema.table('movies', (table) => {
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
    });
};