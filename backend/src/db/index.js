var config = require('../../config');
var knex = require('knex')(config.database);
var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
