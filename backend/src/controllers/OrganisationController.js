/**
 * OrganisationController
 *
 * @description :: Server-side logic for managing organisations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Boom = require('boom');
var organisationService = require('../services/OrganisationService');

exports.create = function (request, reply) {
    var user = request.auth.credentials;

    organisationService.createOrganisation(user, request.payload.name, request.payload.description, request.payload.name)
    .then(function (organisation) {
        return reply(organisation);
    })
    .catch(function (err) {
        return reply(err);
    });
}
