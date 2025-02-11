'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    async create(user) {
        const { User } = this.server.models();
        const newUser = await User.query().insertAndFetch(user);

        const { mailService } = this.server.services();
        await mailService.sendWelcomeEmail(newUser);

        return newUser;
    }

    list() {
        const { User } = this.server.models();
        return User.query();
    }

    deleteById(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    updateById(id, user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(id, user);
    }

    findByMail(mail) {
        const { User } = this.server.models();
        return User.query().findOne({ mail });
    }
};