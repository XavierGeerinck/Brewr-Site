/**
* This file will initialize the database and it's tables
*/
var Schema = require('../schemas/schema.js');
var data = require('../seeds/data.json');
var Promise = require('bluebird');
var async = require('async');
var bcrypt = require('bcrypt');
var ITERATIONS = 10;
var knex = require('../').knex;

exports.dropTable = function (tableName, knex) {
    knex = knex || require('../');

    return new Promise(function (resolve, reject) {
        knex.schema.hasTable(tableName)
        .then(function (exists) {
            // If table does not exist, resolve anyway
            if (!exists) {
                return resolve('TABLE DOES NOT EXIST');
            }

            return knex.schema.dropTable(tableName)
        })
        .then(function (result) {
            return resolve(result);
        })
        .catch(function (err) {
            return reject(err);
        });
    })
};

exports.seed = function () {
    // Deep copy since we will perform delete!
    var dbData = JSON.parse(JSON.stringify(data));
    var tables = Object.keys(data);

    // Go through all the tables
    return Promise.each(tables, function (table) {
        var records = dbData[table];

        // Go through all the records
        return Promise.each(records, function (record) {
            // If _raw at the end, hash
            Object.keys(record).forEach(function (key) {
                if (key.indexOf('_raw') > -1) {
                    record[key.substring(0, key.length - '_raw'.length)] = bcrypt.hashSync(record[key], ITERATIONS);
                    delete record[key];
                }
            });

            // Insert
            return knex(table).insert(record);
        });
    });
}

exports.truncate = function () {

    // Get our tables reverse, that we we do not get foreign key problems
    var tables = Object.keys(Schema);

    return Promise.each(tables, function (table) {
        // We truncate every table with CASCADE for security
        // See: http://www.postgresql.org/docs/9.1/static/sql-truncate.html
        return knex.raw('TRUNCATE TABLE "' + table + '" CASCADE');
    });
};

exports.createTable = function (tableName, knex) {
    // And create a table for each one
    return knex.schema.createTable(tableName, function (table) {
        // Init vars for the columnkeys
        var column;
        var columnKeys = Object.keys(Schema[tableName]);

        // For each columnkey, add it to the column definition
        columnKeys.forEach(function (key) {
            // Set the currentKey
            var currentKey = Schema[tableName][key];

            // Type handler
            if (currentKey.type === "text" && currentKey.hasOwnProperty("fieldtype")) {
                column = table[currentKey.type](key, currentKey.fieldtype);
            } else if (currentKey.type === "string" && currentKey.hasOwnProperty("maxlength")) {
                column = table[currentKey.type](key, currentKey.maxlength);
            } else {
                column = table[currentKey.type](key);
            }

            // Nullable handler
            if (currentKey.hasOwnProperty("nullable") && currentKey.nullable === true) {
                column.nullable();
            } else {
                column.notNullable();
            }

            // Primary key constraint
            if (currentKey.hasOwnProperty("primary") && currentKey.primary === true) {
                column.primary();
            }

            // Unique constraint
            if (currentKey.hasOwnProperty("unique") && currentKey.unique === true) {
                column.unique();
            }

            // Is unsigned
            if (currentKey.hasOwnProperty("unsigned") && currentKey.unsigned === true) {
                column.unsigned();
            }

            // FK contstraint
            if (currentKey.inTable && currentKey.hasOwnProperty("references")) {
                column.references(currentKey.inTable + '.' + currentKey.references);
            } else if (currentKey.hasOwnProperty("references")) {
                column.references(currentKey.references);
            }

            // Default value
            if (currentKey.hasOwnProperty("defaultTo")) {
                column.defaultTo(currentKey.defaultTo);
            }

            // Comment meta data
            if (currentKey.hasOwnProperty('comment')) {
                column.comment(currentKey.comment);
            }
        });
    });
};
