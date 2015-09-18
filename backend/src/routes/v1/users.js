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
        path: '/users/{user}/organisations',
        config: {
            handler: UserController.memberOf,
            validate: {
                params: {
                    user: Joi.number().integer()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{user}/projects',
        config: {
            handler: UserController.assignedTo,
            validate: {
                params: {
                    user: Joi.number().integer()
                }
            }
        }
    }
];