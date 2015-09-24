'use strict';

var UserController = require('../../controllers/UserController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/user',
        config: {
            handler: UserController.get,
            auth: {
                strategy: 'bearer',
                scope: [ 'user' ]
            }
        }
    },
    {
        method: 'GET',
        path: '/user/organisation',
        config: {
            handler: UserController.getOrganisationsByUser,
            auth: {
                strategy: 'bearer',
                scope: [ 'user' ]
            }
        }
    }//,
    // {
    //     method: 'GET',
    //     path: '/organisations/{organisation}/users/{user}',
    //     config: {
    //         handler: UserController.show,
    //         auth: {
    //             strategy: 'bearer',
    //             scope: ['member-{params.organisation}']
    //         },
    //         validate: {
    //             params: {
    //                 organisation: Joi.number().integer(),
    //                 user: Joi.number().integer()
    //             }
    //         }
    //     }
    // },
    // {
    //     method: 'GET',
    //     path: '/users/{user}',
    //     config: {
    //         handler: UserController.memberOf,
    //         auth: {
    //             strategy: 'bearer',
    //             scope: [ 'user' ]
    //         },
    //         validate: {
    //             params: {
    //                 user: Joi.number().integer()
    //             }
    //         }
    //     }
    // },
    // {
    //     method: 'GET',
    //     path: '/organisations/{organisation}/users/{user}/projects',
    //     config: {
    //         handler: UserController.assignedTo,
    //         auth: {
    //             strategy: 'bearer',
    //             scope: ['member-{params.organisation}']
    //         },
    //         validate: {
    //             params: {
    //                 organisation: Joi.number().integer(),
    //                 user: Joi.number().integer()
    //             }
    //         }
    //     }
    // }
];
