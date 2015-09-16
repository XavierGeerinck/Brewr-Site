/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
var uuid = require('uuid');
var async = require('async');
var Promise = require('bluebird');
var server = require('../../index.js');
var Boom = require('boom');

module.exports = {
    /**
    * Find a user's assigned projects
    * @param req
    * @param res
    */
    assigned: function (request, reply) {
        var ProjectUser = request.server.plugins.dogwater.projectuser;
        var user = request.auth.credentials.user;

        ProjectUser
        .find({"user": user.id})
        .populate("project")
        .exec(function (err, assigned) {
            res.json(assigned);
        });
    },

    /**
    * Returns all projects in a given organisation
    * Integer organisation: The organisation parameter given in the request
    * Integer user: The logged in user who is requesting
    * @param req
    * @param reply
    */
    index: function(request, reply) {
        var organisation = request.params.organisation;
        var userObj = request.auth.credentials.user;

        var User = request.collections.user;

        User.isMemberOf(userObj.id, organisation, function (isMember) {
            if (!isMember) {
                return res.json({"success": false, "message": "ORGANISATION_NON_MEMBER"})
            }

            Project
            .find({"organisation": organisation})
            .exec(function (err, projects) {
                if (err) {
                    console.log(err);
                    return reply(Boom.badRequest("Could not find project"));
                }

                return res.json(projects);
            });
        });
    },

    /**
    * Show a project given by its ID and Logged user
    * @param req
    * @param res
    */
    show: function(request, reply) {
        var User = request.collections.user;

        var user = request.auth.credentials.user;
        var organisation = request.param('organisation');
        var project = request.param('project');

        // verify that user belongs to this organisation
        User.isMemberOf(user.id, organisation, function(isMember){

            //res.end();
            res.badRequest({"success": false, "message": "ORGANISATION_NON_MEMBER"});

            //if(!isMember){
            //  res.badRequest({"success": false, "message": "ORGANISATION_NON_MEMBER"})
            //} else {
            //
            //  // verify that project belongs to organisation
            //  Project.belongsTo(project, organisation, function (belongs, project) {
            //    if (!belongs) {
            //      res.badRequest({"success": false, "message": "PROJECT_NO_BELONG"})
            //    } else {
            //      res.json(project);
            //    }
            //  })
            //}
        });
    },

    /**
    * Assign a user to a project
    * @param req
    * @param res
    */
    assign: function (request, reply) {
        var User = request.collections.user;

        var assigneeId = request.auth.credentials.user;
        var userId = request.body.user;
        var projectId = request.param('project');

        User.assign(assigneeId, userId, projectId, function (succeeded, code) {
            if (succeeded) {
                return res.json({"success": true});
            }

            //TODO: add status codes
            return res.json({"success": false});
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
        var user = request.auth.credentials.user;

        // Project name is required
        if (!params.meta.name) {
            return res.badRequest('EMPTY_PROJECT_NAME', 'POST /project');
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
            return reply({ succes: true });
        })
        .catch(function (err) {
            return reply(Boom.badRequest(err));
        });
    }
};
