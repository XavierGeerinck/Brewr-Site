/**
* AuthController
* @description handles the authentications
*/
var Boom = require('boom');
var AuthService = require('../services/AuthService.js');
var _ = require('lodash');

module.exports = {
    /**
    * Create a new user
    * @param request
    * @param reply
    */
    signup: function (request, reply) {
        var User = request.collections.user;

        User
        .create({
            email: request.payload.email,
            password: request.payload.password,
            first_name: request.payload.firstName,
            last_name: request.payload.lastName,
            name: request.payload.firstName + ' ' + request.payload.lastName
        })
        .then(function (user) {
            return reply(AuthService.createReply(user));
        })
        .catch(function (data, options){
            var err = Boom.badData(data.code);
            err.output.payload.invalidAttributes = data.invalidAttributes;
            return reply(err);
        });
    },

    /**
    * Create a response with a token according to given user details
    * @param request
    * @param reply
    */
    signin: function (request, reply){
        var User = request.collections.user;
        var UserSession = request.collections.usersession;
        var info = {};
        var userModel = null;

        User
        .findOne({ email: request.payload.email})
        .populate('memberOf')
        .populate('ownerOf')
        .then(function (user){
            userModel = user;

            // Check if the user exists
            if (!user) {
                return Promise.reject(Boom.unauthorized(null, 'E_USER_NOT_FOUND'));
            }

            // Also make sure that the password is correct
            if (!AuthService.comparePassword(request.payload.password, user)) {
                return Promise.reject(Boom.unauthorized(null, 'E_WRONG_PASSWORD'));
            }

            // From here we are logged in
            if (!user.scopes) {
                user.scopes = [];
            }

            // dynamically modify SCOPES
            // Add member scope
            var isMemberOf = user.isMemberOf();
            for(var m = 0; m < isMemberOf.length; m++) {
                user.scopes.push('member-' + isMemberOf[m].id);
            }

            // Add owner scope
            for(var o = 0; o < user.ownerOf.length; o++) {
                user.scopes.push('owner-' + user.ownerOf[o].id);
            }

            var ip = request.info.remoteAddress;
            var userAgent = request.headers['user-agent'];
            return AuthService.createSession(UserSession, user, ip, userAgent);
        }).then(function (session) {
            return reply({
                user: userModel,
                token: session.token
            });
        })
        .catch(function (err) {
            return reply(err);
        });
    },

    logout: function (request, reply) {
        var UserSession = request.collections.usersession;

        UserSession
        .findOne({ token: request.auth.credentials.token })
        .then(function (userSession) {
            if (!userSession) {
                return Promise.reject(Boom.badRequest('INVALID_TOKEN'));
            }

            return userSession.destroy();
        })
        .then(function () {
            return reply({ success: true });
        })
        .catch(function (err) {
            return reply(err);
        })
    }
};
