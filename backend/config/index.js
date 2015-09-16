var defaultenv = 'dev';
var allowed = ['dev', 'stag', 'prod', 'test'];

var config;

if ((allowed.indexOf(process.argv[2]) === -1) && !process.env.NODE_ENV) {
    config = require(process.cwd() + '/config/app_dev');
} else {
    config = require(process.cwd() + '/config/app_' + (process.env.NODE_ENV || process.argv[2] || defaultenv));
}

module.exports = config;
