var Joi = require('joi');
var AuthController = require('../../controllers/AuthController.js');

module.exports = [
    {
        method: 'POST',
        path: '/auth/signin',
        config: {
            handler: AuthController.login,
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/auth/signup',
        config: {
            handler: AuthController.register,
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().required(),
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/auth/logout',
        config: {
            handler: AuthController.logout,
            auth: {
                strategy: 'bearer',
                scope: [ 'user' ]
            }
        }
    }
];
