/**
 * AuthController
 * @description handles the authentications
 */
var Boom = require('boom');
var AuthService = require('../services/AuthService.js');
var _ = require('lodash');

function _onAuth(request, reply, err, user, info) {
    if (err) {
        console.log(err);
        return res.serverError(err);
    }

    if (!user) {
        return reply(Boom.unauthorized(null, info && info.code));
    }

    return reply({
        token: AuthService.createToken(user),
        user: user
    });
}

module.exports = {
    signup: function (request, reply) {
        var User = request.collections.user;

        var email = request.payload.email;
        var password = request.payload.password;

        User
        .create(_.omit(request.params, 'id'))
        .then(function (user) {
            return {
                token: AuthService.createToken(user),
                user: user
            };
        })
        .then(function (data, code, message, root){
            reply(reply.continue());
        })

        .catch(function(data, options){

            var err = Boom.badData(data.code);
            err.output.payload.invalidAttributes = data.invalidAttributes;
            reply(err);

        });
    },
    signin: function (request, reply){
        var User = request.collections.user;

        User.findOne({ email: request.payload.email}).exec(function(err, user) {

            var info = {};

            if (err) {
                info.code = "ERR";
                info.message = "An error occured";
                return _onAuth(request, reply, err, user, info);
            }

            // user not found
            if (!user) {
                info.code = "E_USER_NOT_FOUND";
                info.message = "Unknown user: " + request.payload.email;
                return _onAuth(request, reply, err, user, info);
            }

            // wrong password
            if (!AuthService.comparePassword(request.payload.password, user)) {
                info.code = "E_WRONG_PASSWORD";
                info.message = "Invalid password";
                return _onAuth(request, reply, err, user, info);
            }
        });


    }
};
