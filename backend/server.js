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
var server = new Hapi.Server({ debug: { request: ['error'] } });

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

// Register plugins
var models = require('require-all')(__dirname + '/src/models');
var fixtures = require('require-all')(__dirname + '/test/fixtures');

function start () {
    var self = this;
    return new Promise(function (resolve, reject) {
        registerPlugins()
        .then(function () {
            return startServer();
        })
        .then(function () {
            return resolve(server);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
}

function startServer() {
    return new Promise(function (resolve, reject) {
        server.start(function () {
            return resolve();
        });
    });
}

function registerPlugins() {

    return new Promise(function (resolve, reject) {
        server.register([
            {
                register: require('dogwater'),
                options: {
                    adapters: config.database.adapters,
                    connections: config.database.connections,
                    models: Object.keys(models).map(function (key) { return models[key]; }),
                    fixtures: Object.keys(fixtures).map(function (key) { return fixtures[key]; })[0]
                }
            },
            {
                register: require('hapi-auth-jwt'),
                options: {}
            }
            //,
            // {
            //     register: require('hapi-auth-bearer-simple'),
            //     options: {}
            // }
        ], function (err) {
            if (err) {
                return reject(err);
            }

            console.log()

            registerStrategy(server);
            registerRoutes(server);

            return resolve();
        });
    });
}

function validateFunction(request, decodedToken, callback) {

    if(!decodedToken) {
        return callback(error, false, decodedToken);
    }

    request.payload.user = decodedToken;
    server.expose('request', request);
    return callback(error, true, decodedToken);

};

// Register the authentication strategies
function registerStrategy(server) {
    // Register the strategy
    server.auth.strategy('token', 'jwt', {
        key: config.jwt.privateKey,
        validateFunction: validateFunction
    });
}

// Register all the routes
function registerRoutes(server) {
    var routes = require('require-all')(__dirname + '/src/routes/v1');

    Object.keys(routes).forEach(function (key) {
        server.route(routes[key]);
    });
}

// Register routes
module.exports = {
    start: start,
    server: server
};
