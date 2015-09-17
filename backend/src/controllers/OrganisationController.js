/**
 * OrganisationController
 *
 * @description :: Server-side logic for managing organisations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Boom = require('boom');

module.exports = {

    members: function(request, reply) {

        var organisationId = request.params.organisation;
        var OrganisationUser = request.collections.organisationuser;

        OrganisationUser
            .find({"organisation": organisationId})
            .populate("user")
            .then(function(organisationUsers){
                reply(organisationUsers);
            })
            .catch(function(err){
                reply(Boom.badRequest("ERR_NOT_FOUND"));
            });
    }
};

