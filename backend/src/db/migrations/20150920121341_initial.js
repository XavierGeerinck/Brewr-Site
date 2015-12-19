/**
* The first migration will make use of the schema defined in ../schemas/schema.js
*/
var Schema = require('../schemas/schema.js');
var async = require('async');
var Promise = require('bluebird');
var initDB = require('../utils/dbUtil');

exports.up = function(knex, Promise) {
    return new Promise(function (resolve, reject) {
        // Get the different tables
        var tables = Object.keys(Schema);

        var calls = [];
        tables.forEach(function (tableName) {
            calls.push(function (callback) {
                //console.log('creating: ' + tableName);
                initDB.createTable(tableName, knex)
                .then(function (result) {
                    //console.log('created: ' + tableName);
                    callback(null, result);
                })
                .catch(function (err) {
                    callback(err);
                })
            });
        });

        // Run the calls one by one and wait on each one to finish
        async.series(calls, function (err, results) {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })
};

exports.down = function(knex, Promise) {
    return new Promise(function (resolve, reject) {
        var tables = Object.keys(Schema);

        // We run drop on reverse to cheat the FK's
        async.forEach(tables.reverse(), function (tableName, callback) {
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
