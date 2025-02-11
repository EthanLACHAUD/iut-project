// lib/services/movie.js
'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {
    async create(movie) {
        const { Movie } = this.server.models();
        return Movie.query().insertAndFetch(movie);
    }

    async updateById(id, movie) {
        const { Movie } = this.server.models();
        return Movie.query().patchAndFetchById(id, movie);
    }

    async deleteById(id) {
        const { Movie } = this.server.models();
        return Movie.query().deleteById(id);
    }

    async list() {
        const { Movie } = this.server.models();
        return Movie.query();
    }
};