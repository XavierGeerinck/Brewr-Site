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
    }
];