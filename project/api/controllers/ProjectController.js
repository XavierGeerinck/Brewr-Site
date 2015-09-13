/**
* ProjectController
*
* @description :: Server-side logic for managing projects
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
var uuid = require('uuid');
var async = require('async');
var Promise = require('bluebird');

module.exports = {

    assigned: function (req, res) {
        var user = req.user;
        ProjectUser
        .find({"user": user.id})
        .populate("project")
        .exec(function(err, assigned){
            res.json(assigned);
        });
    },

    allInOrganisation: function (req, res) {
        var organisation = req.param('organisation');
        var user = req.user;

        User.isMemberOf(user.id, organisation, function (isMember){
            if (!isMember) {
                return res.json({"success": false, "message": "ORGANISATION_NON_MEMBER"})
            }

            Project
            .find({"organisation": organisation})
            .exec(function (err, projects){
                if (err) {
                    console.log(err);
                    return res.serverError();
                }

                return res.json(projects);
            });
        });
    },

    assign: function (req, res) {
        var assigneeId = req.user.id;
        var userId = req.body.user;
        var projectId = req.param('project');

        User.assign(assigneeId, userId, projectId, function(succeeded, code){
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
    create: function (req, res) {
        var organisation = req.param('organisation');
        var user = req.user;
        var params = {};
        params.meta = {}; // contains info about the project
        params.envInfo = {}; // Contains environment info
        params.files = req.body.files || [];
        params.envInfo.distribution = req.body.envInfo.distribution;
        params.envInfo.distributionVersion = req.body.envInfo.distributionVersion;
        params.envInfo.maintainer = req.body.envInfo.maintainer;
        params.envInfo.label = req.body.envInfo.label;
        params.envInfo.workdir = req.body.envInfo.workdir;
        params.envInfo.user = req.body.envInfo.user;
        params.envInfo.cmd = req.body.envInfo.cmd;
        params.envInfo.sourceCode = req.body.envInfo.sourceCode;
        params.envInfo.run = req.body.envInfo.run;
        params.envInfo.expose = req.body.envInfo.expose;
        params.envInfo.env = req.body.envInfo.env;
        params.envInfo.add = req.body.envInfo.add;
        params.envInfo.copy = req.body.envInfo.copy;
        params.envInfo.entrypoint = req.body.envInfo.entrypoint;
        params.envInfo.volume = req.body.envInfo.volume;
        params.envInfo.onbuild = req.body.envInfo.onbuild;
        params.meta.name = req.body.meta.name;
        params.meta.description = req.body.meta.description;

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
            return res.json({ succes: true });
        })
        .catch(function (err) {
            return res.badRequest(err, 'POST /project');
        });
    }
};
