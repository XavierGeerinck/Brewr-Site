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

module.exports = {
    /**
     * Find a user's assigned projects
     * @param req
     * @param res
     */
    assigned: function (request, reply) {
        var ProjectUser = request.collections.projectuser;
        var user = request.auth.credentials;

        ProjectUser
            .find({"user": user.id})
            .populate("project")
            .exec(function (err, assigned) {
                return reply(assigned);
            });
    },

    /**
     * Returns all projects in a given organisation
     * Integer organisation: The organisation parameter given in the request
     * Integer user: The logged in user who is requesting
     * @param req
     * @param reply
     */
    index: function (request, reply) {
        var organisation = request.params.organisation;
        var userObj = request.auth.credentials;

        var User = request.collections.user,
            Project = request.collections.project;

        Project
            .find({"organisation": organisation})
            .exec(function (err, projects) {
                if (err) {
                    console.log(err);
                    return reply(Boom.badRequest("Could not find project"));
                }

                return reply(projects);
            });
    },

    /**
     * Show a project given by its ID and Logged user
     * @param req
     * @param res
     */
    show: function (request, reply) {
        var User = request.collections.user,
            Project = request.collections.project;

        var user = request.auth.credentials,
            organisation = request.params.organisation,
            project = request.params.project;

        Project.belongsTo(project, organisation, function (belongs, project) {
            if (!belongs) {
                return reply(Boom.badRequest("PROJECT_NO_BELONG"));
            } else {
                return reply(project);
            }
        });
    },

    /**
     * Assign a user to a project
     * @param req
     * @param res
     */
    assign: function (request, reply) {
        var User = request.collections.user;

        var assigneeId = request.auth.credentials.id,
            userId = request.payload.user,
            projectId = request.params.project;

        User.assign(assigneeId, userId, projectId, function (succeeded, code) {
            if (succeeded) {
                return reply({"success": true});
            }

            //TODO: add status codes
            return reply(Boom.badRequest(code));
        });
    },

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
    create: function (request, reply) {
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
};
