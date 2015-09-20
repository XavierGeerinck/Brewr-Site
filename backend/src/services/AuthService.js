var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var crypto = require('crypto');
var User = require('../db/models/User');
var UserSession = require('../db/models/UserSession');
var Boom = require('boom');

exports.createAccount = function (email, password, firstName, lastName) {
    var self = this;

    return new Promise(function (resolve, reject) {
        self.hashPassword(password)
        .then(function (hashedPassword) {
            return User.forge({
                email: email,
                password: hashedPassword,
                first_name: firstName,
                last_name: lastName,
                name: firstName + ' ' + lastName
            })
            .save();
        })
        .then(function (user) {
            return resolve(user);
        })
        .catch(function (err) {
            return reject(Boom.badRequest(err));
        });
    });
};

exports.authorize = function (email, password, ip, userAgent) {
    var self = this;
    var userObject;

    return new Promise(function (resolve, reject) {
        User
        .forge({
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

            // TODO: Dynamic scopes??

            // Create session
            return self.createSession(userObject, ip, userAgent);
        })
        .then(function (userSession) {
            return resolve({
                user: userObject,
                token: userSession.get('token')
            });
        })
        .catch(function (err) {
            return reject(Boom.badRequest(null, err));
        })
    });
};

exports.hashPassword = function (password) {
    var ITERATIONS = 10;

    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, ITERATIONS, function (err, hash) {
            if (err) {
                return reject(err);
            }

            return resolve(hash);
        });
    });
}

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
            user: user.get('id'),
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
