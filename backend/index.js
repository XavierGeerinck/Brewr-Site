'use strict';

// Server require
var server = require('./server');
var config = require('./config');

// Start
server.start(function (err) {
    if (err) {
        throw err;
    }

    console.log('Server started on ' + config.server.ip + ':' + config.server.port);
    server.log(['info', 'server'], 'Server started on ' + config.server.ip + ':' + config.server.port);
});
