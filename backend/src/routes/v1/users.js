'use strict';

var UserController = require('../../controllers/UserController');
var Joi = require('joi');


module.exports = [
    {
        method: 'GET',
        path: '/user',
        config: {
            handler: UserController.showLogged,
            auth: 'token'
        }
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/users/{user}',
        config: {
            handler: UserController.show,
            auth: 'token',
            validate: {
                params: {
                    organisation: Joi.number().integer(),
                    user: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{user}',
        config: {
            handler: UserController.memberOf,
            auth: 'token',
            validate: {
                params: {
                    user: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/organisations/{organisation}/users/{user}/projects',
        config: {
            handler: UserController.assignedTo,
            auth: 'token',
            validate: {
                params: {
                    organisation: Joi.number().integer(),
                    user: Joi.number().integer()
                }
            }
        }
    }
];