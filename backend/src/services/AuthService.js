var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');

module.exports = {
    hashPassword: function (password) {
        return bcrypt.hashSync(password);
    },

    comparePassword: function(password, user) {
        return bcrypt.compareSync(password, user.password);
    },

    createToken: function() {
        var sha = crypto.createHash('sha256');
        sha.update(Math.random().toString());
        return sha.digest('hex');
    },

    createSession: function (sessionDB, user, ip, userAgent) {
        var token = this.createToken();

        return new Promise(function (resolve, reject) {
            sessionDB
            .create({
                user: user,
                token: token,
                user_agent: userAgent,
                ip: ip
            })
            .then(function (usersession) {
                return resolve(usersession);
            })
            .catch(function (data, options) {
                return reject(data);
            });
        });
    },

    createReply: function(user) {
        return {
            token: this.createToken(user),
            user: user
        }
    }
};
