'use strict';

var OrganisationController = require('../../controllers/OrganisationController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/organisations/{organisation}/members',
        config: {
            handler: OrganisationController.members,
            auth: 'token',
            validate: {
                params: {
                    organisation: Joi.number().integer()
                }
            }
        }
    }
];