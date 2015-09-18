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
        return reply(Boom.badRequest(info && info.code));
    }

    if (!user) {
        return reply(Boom.unauthorized(null, info && info.code));
    }

    return reply(AuthService.createReply(user));
}

module.exports = {
    /**
     * Create a new user
     * @param request
     * @param reply
     */
    signup: function (request, reply) {
        var User = request.collections.user;

        User
        .create(_.omit(request.params, 'id'))
        .then(function (user) {
            return reply(AuthService.createReply(user));
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

    /**
     * Create a response with a token according to given user details
     * @param request
     * @param reply
     */
    signin: function (request, reply){
        var User = request.collections.user;

        var info = {};

        User
            .findOne({ email: request.payload.email})
            .populate('memberOf')
            .populate('ownerOf')
            .then(function(user){

                if(!user) {
                    info.code = "E_USER_NOT_FOUND";
                    info.message = "Unknown user: " + request.payload.email;
                } else if(!AuthService.comparePassword(request.payload.password, user)) {
                    info.code = "E_WRONG_PASSWORD";
                    info.message = "Invalid password";
                }

                if(!user.scopes) {
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

                return _onAuth(request, reply, null, user, info)
            })
            .catch(function(err){
                info.code = "ERR";
                info.message = "An error occured";
                return _onAuth(request, reply, err, null, info)
            });
    }
};
