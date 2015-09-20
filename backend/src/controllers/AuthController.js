/**
* AuthController
* @description handles the authentications
*/
var Boom = require('boom');
var AuthService = require('../services/AuthService.js');
var _ = require('lodash');

exports.register = function (request, reply) {
    AuthService
    .createAccount(request.payload.email, request.payload.password, request.payload.firstName, request.payload.lastName)
    .then(function (account) {
        return reply(account);
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.login = function (request, reply) {
    var ip = request.info.remoteAddress;
    var userAgent = request.headers['user-agent'];

    AuthService
    .authorize(request.payload.email, request.payload.password, ip, userAgent)
    .then(function (session) {
        return reply(session);
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.logout = function (request, reply) {
    AuthService
    .logout(request.auth.credentials.token)
    .then(function (isSuccess) {
        return reply(isSuccess);
    })
    .catch(function (err) {
        return reply(err);
    });
};
