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
    }//,
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
