'use strict';

var Hapi = require('hapi');
var http = require('http');
var https = require('https');
var config = require('./config');
var Promise = require('bluebird');

// Set max sockets to be open
http.globalAgent.maxSockets = Number.MAX_VALUE;
https.globalAgent.maxSockets = Number.MAX_VALUE;

// Create server
var server = new Hapi.Server(config.server.is_debug ? { debug: { request: ['error'] } } : {});
server.connection({
    host: config.server.ip,
    port: config.server.port,
    routes: {
        cors: {
            origin: config.server.cors_client_origins,
            headers: config.server.cors_headers,
            methods: config.server.cors_methods,
            credentials: config.server.cors_credentials
        }
    }
});

// For now we do validate here until I got a good way to use the models everywhere
function validateFunction (token, callback) {
    if (!token) {
        return callback('E_NO_TOKEN');
    }

    var UserSession = require('./src/db/models/UserSession');
    var User = require('./src/db/models/User');

    UserSession
    .where({ token: token })
    .fetch({ withRelated: [ 'user' ] })
    .then(function (session) {
        if (!session) {
            return Promise.reject('E_INVALID_TOKEN');
        }

        var userObj = session.related('user');

        // Set scope object for hapi authenticator,
        // needed since we can not access attributes instantly
        userObj.scope = userObj.get('scope');

        return callback(null, true, userObj)
    })
    .catch(function (err) {
        return callback(err);
    })
}

// Register the authentication strategies
function registerStrategy() {
    var AuthService = require('./src/services/AuthService.js');

    // Register the strategy
    server.auth.strategy('bearer', 'bearerAuth', {
        validateFunction: validateFunction
    });
}

// Register all the routes
function registerRoutes() {
    var routes = require('require-all')(__dirname + '/src/routes/v1');

    Object.keys(routes).forEach(function (key) {
        server.route(routes[key]);
    });
}

// Register the plugins, routes and authentication strategy
server.register([
    {
        register: require('hapi-auth-bearer-simple'),
        options: {}
    }
], function (err) {
    if (err) {
        throw err;
    }

    registerStrategy();
    registerRoutes();
});

// Register routes
module.exports = server;
