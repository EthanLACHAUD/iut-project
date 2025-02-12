// lib/services/movie.js
'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {
    async create(movie) {
        const { Movie } = this.server.models();
        const newMovie = await Movie.query().insertAndFetch(movie);

        const { mailService, userService } = this.server.services();
        const users = await userService.list();
        for (const user of users) {
            await mailService.sendNewMovieNotification(user, newMovie);
        }

        return newMovie;
    }

    async updateById(id, movie) {
        const { Movie } = this.server.models();
        const updatedMovie = await Movie.query().patchAndFetchById(id, movie);

        const { mailService, favoriteService } = this.server.services();
        const users = await favoriteService.getUsersWithFavorite(id);
        for (const user of users) {
            await mailService.sendMovieUpdatedNotification(user, updatedMovie);
        }

        return updatedMovie;
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