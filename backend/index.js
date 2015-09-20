'use strict';

// Server require
var server = require('./server');
var config = require('./config');

// Start
server.start()
.then(function (server) {
    console.log('Server started on ' + config.server.ip + ':' + config.server.port);
    server.log(['info', 'server'], 'Server started on ' + config.server.ip + ':' + config.server.port);
})
.catch(function (err) {
    console.log(err.message);
    console.trace(err);
});
