var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var crypto = require('crypto');
var User = require('../db/models/User');
var UserSession = require('../db/models/UserSession');
var Boom = require('boom');

exports.removeSessionByUserIdExpectToken = function (userId, token) {
    return UserSession.query({ where: { user_id: userId }, whereNot: { token: token }}).destroy();
};

exports.removeSessionByToken = function (token) {
    return UserSession.where({ token: token }).destroy();
};

exports.getSessionsByUserId = function (userId) {
    return UserSession.where({ user_id: userId }).fetchAll();
};

exports.createAccount = function (email, password, firstName, lastName) {
    var self = this;

    return User
    .forge({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        name: firstName + ' ' + lastName
    })
    .save();
};

exports.authorize = function (email, password, ip, userAgent) {
    var self = this;
    var userObject;

    return new Promise(function (resolve, reject) {
        User
        .where({
            email: email
        })
        .fetch()
        .then(function (user) {
            if (!user) {
                return reject(Boom.unauthorized(null, 'E_USER_NOT_FOUND'));
            }

            userObject = user;

            return self.comparePassword(user.get('password'), password);
        })
        .then(function (isMatch) {
            if (!isMatch) {
                return reject(Boom.unauthorized(null, 'E_WRONG_PASSWORD'));
            }

            // Create session
            return self.createSession(userObject, ip, userAgent);
        })
        .then(function (userSession) {
            return resolve(userSession);
        })
        .catch(function (err) {
            return reject(Boom.badRequest(null, err));
        })
    });
};

/**
 * Note: Returns isMatch (so true or false)!
 */
exports.comparePassword = function(hash, plain) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(plain, hash, function (err, res) {
            if (err) {
                return reject(err);
            }

            return resolve(res);
        });
    });
}

exports.createToken = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
}

exports.createSession = function (user, ip, userAgent) {
    var token = this.createToken();

    return new Promise(function (resolve, reject) {
        UserSession
        .forge({
            user_id: user.get('id'),
            token: token,
            user_agent: userAgent,
            ip: ip
        })
        .save()
        .then(function (userSession) {
            return resolve(userSession);
        })
        .catch(function (data, options) {
            return reject(data);
        });
    });
}

exports.logout = function (token) {
    return new Promise(function (resolve, reject) {
        UserSession
        .forge({
            token: token
        })
        .fetch()
        .then(function (userSession) {
            if (userSession) {
                return userSession.destroy();
            }

            return Promise.resolve();
        })
        .then(function () {
            return resolve(true);
        })
        .catch(function (data, options) {
            return reject(data);
        });
    });
}
