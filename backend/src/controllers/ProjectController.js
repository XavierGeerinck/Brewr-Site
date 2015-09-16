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
        var user = request.user;
        
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
        var user = request.payload.user;

        var User = request.server.plugins.dogwater.user;

        User.isMemberOf(user.id, organisation, function (isMember) {
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
        var User = request.server.plugins.dogwater.user;

        var user = request.user;
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
        var User = request.server.plugins.dogwater.user;

        var assigneeId = request.user.id;
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
        var Project = request.server.plugins.dogwater.user;
        var ProjectRevision = request.server.plugins.dogwater.user;
        var ProjectFile = request.server.plugins.dogwater.user;

        var organisation = request.param('organisation');
        var user = request.user;
        var params = {};
        params.meta = {}; // contains info about the project
        params.envInfo = {}; // Contains environment info
        params.files = request.body.files || [];
        params.envInfo.distribution = request.body.envInfo.distribution;
        params.envInfo.distributionVersion = request.body.envInfo.distributionVersion;
        params.envInfo.maintainer = request.body.envInfo.maintainer;
        params.envInfo.label = request.body.envInfo.label;
        params.envInfo.workdir = request.body.envInfo.workdir;
        params.envInfo.user = request.body.envInfo.user;
        params.envInfo.cmd = request.body.envInfo.cmd;
        params.envInfo.sourceCode = request.body.envInfo.sourceCode;
        params.envInfo.run = request.body.envInfo.run;
        params.envInfo.expose = request.body.envInfo.expose;
        params.envInfo.env = request.body.envInfo.env;
        params.envInfo.add = request.body.envInfo.add;
        params.envInfo.copy = request.body.envInfo.copy;
        params.envInfo.entrypoint = request.body.envInfo.entrypoint;
        params.envInfo.volume = request.body.envInfo.volume;
        params.envInfo.onbuild = request.body.envInfo.onbuild;
        params.meta.name = request.body.meta.name;
        params.meta.description = request.body.meta.description;

        // Project name is required
        if (!params.meta.name) {
            return res.badRequest('EMPTY_PROJECT_NAME', 'POST /project');
        }

        // We first start by creating a new project
        Project.create({
            organisation: organisation,
            createdBy: user,
            name: params.meta.name,
            description: params.meta.description
        })
        .then(function (project) {
            console.log(project);

            // Create the revision
            return ProjectRevision.create({
                project: project,
                revisionNumber: uuid.v4()
            });
        })
        .then(function (projectRevision) {
            console.log(projectRevision);

            // Create the project files
            async.each(params.files, function (file, cb) {
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
            var info = params.envInfo;
            info.projectRevision = projectRevision;

            return ProjectEnvInfo.create(info);
        })
        .then(function (projectEnvInfo) {
            console.log(projectEnvInfo);
            return res.json({succes: true});
        })
        .catch(function (err) {
            return res.badRequest(err, 'POST /project');
        });
    }
};
