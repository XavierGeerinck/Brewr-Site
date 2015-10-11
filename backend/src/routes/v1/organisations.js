'use strict';

var OrganisationController = require('../../controllers/OrganisationController');
var Joi = require('joi');


module.exports = [
    {
        method: 'POST',
        path: '/organisation',
        config: {
            handler: OrganisationController.create,
            auth: {
                strategy: 'bearer',
                scope: [ 'user' ]
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().allow([ null, '' ]),
                    logo: Joi.string().uri()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisation/{organisation}/members/',
        config: {
            handler: OrganisationController.getMembers,
            auth: {
                strategy: 'bearer',
                scope: [ 'belongs-to-organisation-{params.organisation}-user' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/organisation/{organisation}/members/{memberId}',
        config: {
            handler: OrganisationController.addMember,
            auth: {
                strategy: 'bearer',
                scope: [ 'belongs-to-organisation-{params.organisation}-creator', 'belongs-to-organisation-{params.organisation}-manager' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    memberId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/organisation/{organisation}/members/{memberId}',
        config: {
            handler: OrganisationController.removeMember,
            auth: {
                strategy: 'bearer',
                scope: [ 'belongs-to-organisation-{params.organisation}-creator', 'belongs-to-organisation-{params.organisation}-manager' ]
            },
            validate: {
                params: {
                    organisation: Joi.string().guid().required(),
                    memberId: Joi.number().required()
                }
            }
        }
    }
    // {
    //     method: 'GET',
    //     path: '/organisations/{organisation}/members',
    //     config: {
    //         handler: OrganisationController.members,
    //         auth: {
    //             strategy: 'bearer',
    //             scope: [ 'user' ]
    //         },
    //         validate: {
    //             params: {
    //                 organisation: Joi.number().integer()
    //             }
    //         }
    //     }
    // }
];
