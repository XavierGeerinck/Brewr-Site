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

    organisationService
    .createOrganisation(user.get('id'), request.payload.name, request.payload.description, request.payload.name)
    .then(function (organisation) {
        return reply(organisation);
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.addMember = function (request, reply) {
    var memberId = request.params.memberId;
    var organisationUUID = request.params.organisation;

    organisationService
    .addMemberByOrganisationUUID(organisationUUID, memberId)
    .then(function (success) {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply(err);
    });
}

exports.removeMember = function (request, reply) {
    var memberId = request.params.memberId;
    var organisationUUID = request.params.organisation;

    organisationService
    .removeMemberByOrganisationUUID(organisationUUID, memberId)
    .then(function (success) {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.getMembers = function (request, reply) {
    var organisationUUID = request.params.organisation;

    organisationService
    .getMembersByOrganisationUUID(organisationUUID)
    .then(function (members) {
        return reply(members);
    })
    .catch(function (err) {
        return reply(err);
    });
};
