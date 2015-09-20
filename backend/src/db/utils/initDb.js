/**
* This file will initialize the database and it's tables
*/
var Schema = require("../schemas/schema.js");

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
            if (currentKey.hasOwnProperty("references")) {
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
