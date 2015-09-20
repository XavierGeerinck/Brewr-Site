/**
* The first migration will make use of the schema defined in ../schemas/schema.js
*/
var Schema = require('../schemas/schema.js');
var async = require('async');
var Promise = require('bluebird');
var initDB = require('../utils/initDb');

exports.up = function(knex, Promise) {
    return new Promise(function (resolve, reject) {
        // Get the different tables
        var tables = Object.keys(Schema);

        // Loop through them
        async.forEach(tables, function (tableName, callback) {
            initDB.createTable(tableName, knex)
            .then(function (result) {
                callback(null, result);
            })
            .catch(function (err) {
                callback(err);
            });
        }, function (err) {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    })
};

exports.down = function(knex, Promise) {
    return new Promise(function (resolve, reject) {
        var tables = Object.keys(Schema);

        async.forEach(tables, function (tableName, callback) {
            initDB.dropTable(tableName, knex)
            .then(function (result) {
                callback(null, result);
            })
            .catch(function (err) {
                callback(err);
            });
        }, function (err) {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};
