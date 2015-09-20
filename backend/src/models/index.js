var config = require('../../config');
var knex = require('knex')(config.knex);
var bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;
