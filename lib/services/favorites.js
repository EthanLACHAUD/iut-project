'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {
    async addFavorite(userId, movieId) {
        const { Favorite } = this.server.models();
        const existingFavorite = await Favorite.query().skipUndefined().findOne({ userId, movieId });
        if (existingFavorite) {
            throw new Error('Movie already in favorites');
        }

        return await Favorite.query().insert({ userId, movieId });
    }

    async removeFavorite(userId, movieId) {
        const { Favorite } = this.server.models();
        const favorite = await Favorite.query().skipUndefined().findOne({ userId, movieId });
        if (!favorite) {
            throw new Error('Movie not in favorites');
        }

        await Favorite.query().delete().where({ userId, movieId });
    }

    async listFavorites(userId) {
        const { Favorite, Movie } = this.server.models();
        return await Favorite.query().skipUndefined().where({ userId }).withGraphFetched('movie');
    }
};