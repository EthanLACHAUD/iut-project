'use strict';

module.exports = {
    async up(knex) {
        await knex.schema.table('user', (table) => {
            table.string('password').notNull();
            table.string('mail').notNull().unique();
            table.string('username').notNull().unique();
        });
    },

    async down(knex) {
        await knex.schema.table('user', (table) => {
            table.dropColumn('password');
            table.dropColumn('mail');
            table.dropColumn('username');
        });
    }
};