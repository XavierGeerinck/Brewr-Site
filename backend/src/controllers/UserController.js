/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Boom = require('boom');
module.exports = {
    all: function (request, reply) {
        var User = request.server.plugins.dogwater.user;

        User.find({}, function (err, users){
           res.json(users);
        });
    },

    getUser: function (request, reply) {
        return reply(request.auth.credentials);
    },
    show: function(request, reply){
        var User = request.collections.user;

        var userId = request.params.user,
            organisationId = request.params.organisation,
            loggedUser = request.auth.credentials;

        User.areMemberOf([loggedUser.id, userId], organisationId, function(areMembers, details){
            if(!areMembers) {
                console.log(details);
                return reply(Boom.badRequest("NO_MEMBER"));
            }

            User.findOne({"id": userId})
                .then(function(user){
                    reply(user);
                })
                .catch(function(err){
                    console.log(err);
                    reply(Boom.badRequest("USER_NOT_FOUND"));
                });
        })
    },
    assignedTo: function(request, reply) {
        var User = request.collections.user;

        var userId = request.params.user,
            organisationId = request.params.organisation,
            loggedUser = request.auth.credentials;

        User.areMemberOf([loggedUser.id, userId], organisationId, function(areMembers, details) {
            if (!areMembers) {
                return reply(Boom.badRequest("NO_MEMBER"));
            }

            User.findOne({"id": userId})
                .populate('assignedTo')
                .then(function (user) {
                    reply(user.assignedTo);
                })
                .catch(function (err) {
                    console.log(err);
                    reply(Boom.badRequest("USER_NOT_FOUND"))
                });
        });
    },
    memberOf: function(request, reply) {
        var User = request.collections.user;
        var userId = request.params.user;

        User.findOne({"id": userId})
            .populate('memberOf')
            .populate('ownerOf')
            .then(function (user) {
                reply(user.isMemberOf());
            })
            .catch(function (err) {
                console.log(err);
                reply(Boom.badRequest("USER_NOT_FOUND"));
            });
    }
};
