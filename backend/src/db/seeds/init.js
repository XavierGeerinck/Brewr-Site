var data = require('./data.json');
var async = require('async');

exports.seed = function(knex, Promise) {
    var tables = data.map(function (item) {
        return item.table
    });

    return Promise.reduce(tables, function (_, table) {
        var records = data.filter(function (item) {
            return item.table == table;
        })[0];

        var records = records.items;

        // Delete all records
        return knex(table).del()
        .then(function () {
            // Insert the data
            return Promise.all(records.map(function (record) {
                return knex(table).insert(record);
            }));
        });
    }, null);

    //
    // return Promise.join(
    //     // Deletes ALL existing entries
    //     knex('table_name').del(),
    //
    //     // Inserts seed entries
    //     knex('table_name').insert({id: 1, colName: 'rowValue'}),
    //     knex('table_name').insert({id: 2, colName: 'rowValue2'}),
    //     knex('table_name').insert({id: 3, colName: 'rowValue3'}),
    // );
};
