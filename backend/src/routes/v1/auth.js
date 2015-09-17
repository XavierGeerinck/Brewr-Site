var Joi = require('joi');
var AuthController = require('../../controllers/AuthController.js');

module.exports = [
    {
        method: 'POST',
        path: '/auth/signin',
        config: {
            handler: AuthController.signin,
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST', path: '/auth/signup',
        config: {
            handler: AuthController.signup,
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    }
];
