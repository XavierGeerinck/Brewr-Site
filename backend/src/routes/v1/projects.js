'use strict';

var ProjectController = require('../../controllers/ProjectController');

module.exports = [
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects',
        config: {handler: ProjectController.index, auth: 'token'}
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects/{project}',
        config: { handler: ProjectController.show }
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/projects/assigned',
        config: { handler: ProjectController.assigned }
    },
    {
        method: 'POST',
        path: '/organisations/{organisation}/projects/{project}/assign',
        config: { handler: ProjectController.assign }
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
                    files: Joi.array().includes(Joi.object({
                        name: Joi.string().required(),
                        content: Joi.string().required()
                    })),

                    // The environment information
                    envInfo: Joi.object({
                        distribution: Joi.string(),
                        distributionVersion: Joi.string(),
                        maintainer: Joi.string(),
                        label: Joi.array().includes(Joi.string()),
                        workdir: Joi.string(),
                        user: Joi.string(),
                        cmd: Joi.array().includes(Joi.string()),
                        sourceCode: Joi.array().includes(Joi.string()),
                        run: Joi.array().includes(Joi.string()),
                        expose: Joi.array().includes(Joi.string()),
                        env: Joi.array().includes(Joi.string()),
                        add: Joi.array().includes(Joi.string()),
                        copy: Joi.array().includes(Joi.string()),
                        entrypoint: Joi.string(),
                        volume: Joi.array().includes(Joi.string()),
                        onbuild: Joi.string().allow(null)
                    }).required()
                }
            }
        }
    }
];
