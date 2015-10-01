'use strict';

var ProjectController = require('../../controllers/ProjectController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/organisation/{organisation}/project/{project}',
        config: {
            handler: ProjectController.getProjectByIdAndOrganisation ,
            auth: {
                strategy: 'bearer',
                scope: [ 'belongs-to-organisation-{params.organisation}-project-{params.project}-user' ]
            },
            validate: {
                params: {
                    organisation: Joi.number().integer().required(),
                    project: Joi.number().integer().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/projects/{organisation}',
        config: {
            auth: {
                strategy: 'bearer',
                scope: [ 'belongs-to-organisation-{params.organisation}-user' ]
            },
            handler: ProjectController.create,
            validate: {
                payload: {
                    // Meta information about the project
                    meta: Joi.object({
                        name: Joi.string().required(),
                        description: Joi.string()
                    }).required(),

                    // The files for the project
                    files: Joi.array().items(Joi.object({
                        name: Joi.string().required(),
                        content: Joi.string().required()
                    })),

                    // The environment information
                    envInfo: Joi.object({
                        distribution: Joi.string(),
                        distributionVersion: Joi.string(),
                        maintainer: Joi.string(),
                        label: Joi.array().items(Joi.string()),
                        workdir: Joi.string(),
                        user: Joi.string(),
                        cmd: Joi.array().items(Joi.string()),
                        sourceCode: Joi.array().items(Joi.string()),
                        run: Joi.array().items(Joi.string()),
                        expose: Joi.array().items(Joi.string()),
                        env: Joi.array().items(Joi.string()),
                        add: Joi.array().items(Joi.string()),
                        copy: Joi.array().items(Joi.string()),
                        entrypoint: Joi.string(),
                        volume: Joi.array().items(Joi.string()),
                        onbuild: Joi.string().allow(null)
                    }).required()
                }
            }
        }
    }
];
