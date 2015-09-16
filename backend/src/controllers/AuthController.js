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

    return reply({
        token: AuthService.createToken(user),
        user: user
    });
}

module.exports = {
    signup: function (request, reply) {
        var User = request.collections.user;
        User
        .create(_.omit(request.params, 'id'))
        .then(function (user) {
            return {
                token: AuthService.createToken(user),
                user: user
            };
        })
        .then(reply(user))
        .catch(reply(Boom.conflict("Something went wrong")));
    },
    signin: function (request, reply){
        var User = request.collections.user;

        User.findOne({ email: request.payload.email}).exec(function(err, user) {

            var info = {};

            if (err) {
                info.code = "ERR";
                info.message = "An error occured";
            }

            // user not found
            if (!user) {
                info.code = "E_USER_NOT_FOUND";
                info.message = "Unknown user: " + request.payload.email;
            }

            // wrong password
            if (!AuthService.comparePassword(request.payload.password, user)) {
                info.code = "E_WRONG_PASSWORD";
                info.message = "Invalid password";
            }


            return _onAuth(request, reply, err, user, info);
        });


    }
};
