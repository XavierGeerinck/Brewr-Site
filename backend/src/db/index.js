var config = require('../../config');
var knex = require('knex')(config.database);
var bookshelf = require('bookshelf')(knex);

// Load the registry plugin so that we register the models first
bookshelf.plugin('registry');

module.exports = bookshelf;
