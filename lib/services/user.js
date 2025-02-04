'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
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