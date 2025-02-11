'use strict';

exports.up = async function (knex) {
    const hasMoviesTable = await knex.schema.hasTable('movies');
    if (!hasMoviesTable) {
        await knex.schema.createTable('movies', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').notNullable();
            table.date('releaseDate').notNullable();
            table.string('director').notNullable();
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    } else {
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
    }

    const hasFavoritesTable = await knex.schema.hasTable('favorites');
    if (!hasFavoritesTable) {
        await knex.schema.createTable('favorites', (table) => {
            table.increments('id').primary();
            table.integer('userId').unsigned().notNullable();
            table.integer('movieId').unsigned().notNullable();
            table.foreign('userId').references('user.id').onDelete('CASCADE');
            table.foreign('movieId').references('movies.id').onDelete('CASCADE');
        });
    }
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('favorites');
    await knex.schema.dropTableIfExists('movies');
};