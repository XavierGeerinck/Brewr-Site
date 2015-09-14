'use strict';

var globby = require('globby');
var server = require('../../index');

server.route(require('./routes/auth.js'));
server.route(require('./routes/projects.js'));

