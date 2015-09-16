/**
 * AuthController
 * @description handles the authentications
 */
var Boom = require('boom');
var User = hapiServer.getModel('user');
var AuthService = require('../services/AuthService.js');

function _onAuth(req, reply, err, user, info) {
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
    signup: function (req, reply) {
        User
        .create(_.omit(req.params, 'id'))
        .then(function (user) {
            return {
                token: AuthService.createToken(user),
                user: user
            };
        })
        .then(reply.created)
        .catch(reply(Boom.conflict("Something went wrong")));
    },
    signin: function (req, reply){

        User.findOne({ email: req.payload.email}).exec(function(err, user) {

            if (err) {
                return reply({success: false, code: "ERR"});
            }

            // user not found
            if (!user) {
                return reply({success: false, code: "E_USER_NOT_FOUND", message: "Unknown user: " + req.payload.email});
            }

            // wrong password
            if (!AuthService.comparePassword(password, user)) {
                return reply({success: false, code: 'E_WRONG_PASSWORD', message: 'Invalid password'});
            }

            return reply(user);
        });


    }
};
