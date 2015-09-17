'use strict';

var ProjectController = require('../../controllers/ProjectController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects',
        config: {
            handler: ProjectController.index,
            auth: 'token',
            validate: {
                params: {
                    organisation: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects/{project}',
        config: {
            handler: ProjectController.show ,
            auth: 'token',
            validate: {
                params: {
                    organisation: Joi.number().integer(),
                    project: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects/assigned',
        config: {
            handler: ProjectController.assigned,
            auth: 'token'
        }
    },
    {
        method: 'POST',
        path: '/organisations/{organisation}/projects/{project}/assign',
        config: {
            handler: ProjectController.assign,
            auth: 'token',
            validate: {
                params: {
                    project: Joi.number().integer(),
                    organisation: Joi.number().integer()
                },
                payload: {
                    user: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/projects',
        config: {
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
