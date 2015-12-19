'use strict';

var ProjectController = require('../../controllers/ProjectController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/organisation/{organisation}/project/{project}/members',
        config: {
            handler: ProjectController.getMembers,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-member' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisation/{organisation}/project/{project}/image',
        config: {
            handler: ProjectController.getLatestImage,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-member' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().required()
                },
                query: {
                    type: Joi.string().allow([ 'json' ])
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisation/{organisation}/project/{project}/revision/{revision}/image',
        config: {
            handler: ProjectController.getImage,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-member' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().required(),
                    revision: Joi.string().guid().required()
                },
                query: {
                    type: Joi.string().allow([ 'json' ])
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/organisation/{organisation}/project/{project}/assign',
        config: {
            handler: ProjectController.addMember,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-manager', 'organisation-{params.organisation}-project-{params.project}-creator', 'organisation-{params.organisation}-creator' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().required()
                },
                payload: {
                    member: Joi.number().required(),
                    is_manager: Joi.boolean().default(false, 'Specifies if the user is a organisation manager or not').optional()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/organisation/{organisation}/project/{project}/members/{member}',
        config: {
            handler: ProjectController.removeMember,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-manager', 'organisation-{params.organisation}-project-{params.project}-creator', 'organisation-{params.organisation}-creator' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().required(),
                    member: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisation/{organisation}/project/{project}',
        config: {
            handler: ProjectController.getProjectByUUIDAndOrganisation ,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-member' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().integer().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/organisation/{organisation}/project/{project}',
        config: {
            handler: ProjectController.deleteProjectByUUIDAndOrganisation ,
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-project-{params.project}-manager' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    project: Joi.number().integer().required()
                },
                payload: {
                    password: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/organisation/{organisation}/project',
        config: {
            auth: {
                strategy: 'bearer',
                scope: [ 'organisation-{params.organisation}-manager', 'organisation-{params.organisation}-creator' ]
            },
            handler: ProjectController.create,
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                },
                payload: {
                    // Meta information about the project
                    meta: Joi.object({
                        name: Joi.string().required(),
                        description: Joi.string().allow('')
                    }).required(),

                    // The files for the project
                    files: Joi.array().items(Joi.object({
                        name: Joi.string().required(),
                        content: Joi.string().required()
                    })),

                    // The environment information
                    envInfo: Joi.object({
                        distribution: Joi.string().allow([ '', null ]),
                        distributionVersion: Joi.string().allow([ '', null ]),
                        maintainer: Joi.string().allow([ '', null ]),
                        label: Joi.array().items(Joi.string()),
                        workdir: Joi.string().allow([ '', null ]),
                        user: Joi.string().allow([ '', null ]),
                        cmd: Joi.array().items(Joi.string()).allow(null),
                        sourceCode: Joi.array().items(Joi.string()).allow(null),
                        run: Joi.array().items(Joi.string()).allow(null),
                        expose: Joi.array().items(Joi.string()).allow(null),
                        env: Joi.array().items(Joi.string()).allow(null),
                        add: Joi.array().items(Joi.string()).allow(null),
                        copy: Joi.array().items(Joi.string()).allow(null),
                        entrypoint: Joi.string().allow([ '', null ]),
                        volume: Joi.array().items(Joi.string()),
                        onbuild: Joi.string().allow(null)
                    }).required()
                }
            }
        }
    }
];
