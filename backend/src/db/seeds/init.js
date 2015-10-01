var data = require('./data.json');
var async = require('async');
var dbUtil = require('../utils/dbUtil');

exports.seed = function(knex, Promise) {
    return dbUtil.truncate().then(function() { return dbUtil.seed(); });
};
