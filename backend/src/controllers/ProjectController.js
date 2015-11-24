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
        return reply({project: project});
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
    .then(function (project) {
        return reply({ project: project});
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
    var Project = request.collections.user;
    var ProjectRevision = request.collections.user;
    var ProjectFile = request.collections.user;

    var organisation = request.param('organisation');
    var user = request.auth.credentials;

    // Project name is required
    if (!params.meta.name) {
        return reply(Boom.badRequest("EMPTY_PROJECT_NAME", {"path": "POST /project"}));
    }

    // We first start by creating a new project
    Project.create({
        organisation: organisation,
        createdBy: user,
        name: request.meta.name,
        description: request.meta.description || ''
    })
        .then(function (project) {
            // Create the revision
            return ProjectRevision.create({
                project: project,
                revisionNumber: uuid.v4()
            });
        })
        .then(function (projectRevision) {
            // Create the project files
            async.each(request.payload.files, function (file, cb) {
                ProjectFile.create({
                    projectRevision: projectRevision,
                    fileName: file.name,
                    fileDataUri: file.content
                })
                    .exec(function (err, file) {
                        if (err) {
                            return cb(err);
                        }

                        return cb();
                    });
            }, function (err) {
                if (err) {
                    return Promise.reject(err);
                }

                return Promise.resolve(projectRevision);
            });
        })
        .then(function (projectRevision) {
            var info = request.payload.envInfo;
            info.projectRevision = projectRevision;

            return ProjectEnvInfo.create(info);
        })
        .then(function (projectEnvInfo) {
            return reply({succes: true});
        })
        .catch(function (err) {
            return reply(Boom.badRequest(err));
        });
}
