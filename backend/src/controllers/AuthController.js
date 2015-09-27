/**
* AuthController
* @description handles the authentications
*/
var Boom = require('boom');
var AuthService = require('../services/AuthService.js');
var _ = require('lodash');

exports.removeAllSessions = function (request, reply) {
    AuthService.removeSessionByUserIdExpectToken(request.auth.credentials.get('id'), request.auth.credentials.token)
    .then(function (sessionsRemoved) {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.removeSessionByToken = function (request, reply) {
    AuthService.removeSessionByToken(request.params.token)
    .then(function () {
        return reply({ success: true })
    })
    .catch(function (err) {
        return reply(err);
    })
};

exports.getSessionsByUserId = function (request, reply) {
    AuthService.getSessionsByUserId(request.auth.credentials.id)
    .then(function (sessions) {
        return reply(sessions);
    })
    .catch(function (err) {
        return reply(err);
    })
}

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
        return reply({
            token: session.get('token')
        });
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
