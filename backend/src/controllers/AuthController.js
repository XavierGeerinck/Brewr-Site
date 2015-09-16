/**
 * AuthController
 * @description handles the authentications
 */
var Boom = require('boom');
var AuthService = require('../services/AuthService.js');

function _onAuth(request, reply, err, user, info) {
    if (err) {
        console.log(err);
        return res.serverError(err);
    }

    if (!user) {
        return reply(Boom.unauthorized(null, info && info.code, info && info.message));
    }

    return res.ok({
        token: AuthService.createToken(user),
        user: user
    });
}

module.exports = {
    signup: function (request, reply) {
        var User = request.server.plugins.dogwater.user;

        User
        .create(_.omit(request.params, 'id'))
        .then(function (user) {
            return {
                token: AuthService.createToken(user),
                user: user
            };
        })
        .then(reply.created)
        .catch(reply(Boom.conflict("Something went wrong")));
    },
    signin: function (request, reply){
        var User = request.server.plugins.dogwater.user;

        User.findOne({ email: request.payload.email}).exec(function(err, user) {

            if (err) {
                return reply({success: false, code: "ERR"});
            }

            // user not found
            if (!user) {
                return reply({success: false, code: "E_USER_NOT_FOUND", message: "Unknown user: " + request.payload.email});
            }

            // wrong password
            if (!AuthService.comparePassword(password, user)) {
                return reply({success: false, code: 'E_WRONG_PASSWORD', message: 'Invalid password'});
            }

            return reply(user);
        });


    }
};
