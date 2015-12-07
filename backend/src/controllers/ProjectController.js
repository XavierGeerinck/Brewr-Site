/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var uuid = require('uuid');
var async = require('async');
var Promise = require('bluebird');
var Boom = require('boom');
var Project = require('../db/models/Project');
var ProjectService = require('../services/ProjectService');
var AuthService = require('../services/AuthService');

// TODO: Make sure that the projectController returns the correct format (write test)
exports.getImage = function (request, reply) {
    var type = request.query.type;
    var projectId = request.params.project;
    var organisationUUID = request.params.organisation;
    var revisionUUID = request.params.revision;

    ProjectService.getProjectRevisionByUUID(revisionUUID)
    .then(function (projectRevision) {
        if (!projectRevision) {
            return Promise.reject(Boom.badRequest('INVALID_REVISION'));
        }

        return ProjectService.getProjectImage(projectRevision.get('id'));
    })
    .then(function (projectImage) {
        if (!projectImage) {
            return Promise.reject(Boom.badRequest('NO_PROJECT_IMAGE'));
        }

        switch (type) {
            case 'json':
            default:
                return reply(projectImage);
        }
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.promoteToManager = function(request, reply) {
    ProjectService
        .promoteToManager(request.params.project, request.payload.userId)
        .then(function(project){
            return reply(project);
        })
        .catch(function(err){
            return reply(err);
        });
};

exports.getProjectByUUIDAndOrganisation = function (request, reply) {
    ProjectService
    .getProjectByIdAndOrganisation(request.params.project)
    .then(function (project) {
        return reply(project);
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.deleteProjectByUUIDAndOrganisation = function (request, reply) {
    // First check request.payload.password for the correct password of the logged in user
    var user = request.auth.credentials;
    AuthService.comparePassword(user.get('password'), request.payload.password)
    .then(function (isMatch) {
        if (!isMatch) {
            return Promise.reject(Boom.unauthorized('WRONG_PASSWORD'));
        }

        return ProjectService
        .deleteProjectByUUIDAndOrganisation(request.params.organisation, request.params.project);
    })
    .then(function () {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.addMember = function (request, reply) {
    var organisationUUID = request.params.organisation;
    var projectId = request.params.project;

    var memberId = request.payload.member;
    var isManager = request.payload.is_manager;

    ProjectService
    .addMemberByOrganisationUUIDAndProjectId(organisationUUID, projectId, memberId, isManager)
    .then(function (project) {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply({success: false, err: err});
    });
}

exports.removeMember = function (request, reply) {
    var memberId = request.params.member;
    var organisationUUID = request.params.organisation;
    var projectId = request.params.project;

    ProjectService
    .removeMemberByOrganisationUUIDAndProjectId(organisationUUID, projectId, memberId)
    .then(function () {
        return reply({ success: true });
    })
    .catch(function (err) {
        return reply(err);
    });
};

exports.getMembers = function (request, reply) {
    var organisationUUID = request.params.organisation;
    var projectId = request.params.project;

    ProjectService
    .getMembersByOrganisationUUIDAndProjectId(organisationUUID, projectId)
    .then(function (members) {
        return reply(members);
    })
    .catch(function (err) {
        return reply(err);
    });
};

/**
 * Creates a project, it accepts the following parameters:
 * - startup_file_content (app.sh)
 * - startup_command (how to boot docker)
 * - files (contain name and data_uri)
 * - dockerfile (see object definition below)
 * dockerfile = {
 *     distribution: null, // FROM (base)
 *     distribution_version: null, // FROM (version)
 *     instructions: {
 *         maintainer: null, // The MAINTAINER instruction allows you to set the Author field of the generated images.
 *         label: [], // The LABEL instruction adds metadata to an image. A LABEL is a key-value pair. (LABEL <key>=<value> <key>=<value> <key>=<value>)
 *         workdir: null, // The WORKDIR instruction sets the working directory
 *         user: null, // The USER instruction sets the user name or UID to use when running the image
 *         cmd: null,
 *         source_code: null, // This is separate to make it easier to create a dockerfile
 *         run: null,
 *         expose: null,
 *         env: null,
 *         add: null,
 *         copy: null,
 *         entrypoint: null,
 *         volume: null,
 *         onbuild: null
 *     }
 * }
 *
 * The table is project_env_info for this dockerfile info and project_file for the files to be created
 */
exports.create = function (request, reply) {
    var organisationUUID = request.params.organisation;
    var user = request.auth.credentials;
    var metaData = request.payload.meta;
    var envInfo = request.payload.envInfo;
    var files = request.payload.files;

    // Project name is required
    if (!metaData.name) {
        return reply(Boom.badRequest("EMPTY_PROJECT_NAME", {"path": "POST /project"}));
    }

    ProjectService.create(organisationUUID, user, metaData, envInfo, files)
    .then(function (project) {
        return reply(project);
    })
    .catch(function (err) {
        return reply(err);
    });
}
