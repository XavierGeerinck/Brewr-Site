var config = require('../../config');
var knex = require('knex')(config.database);
var bookshelf = require('bookshelf')(knex);

// Load the visibility plugin so that we can hide fields with hidden: []
bookshelf.plugin('visibility');

// Load the registry plugin so that we register the models first
bookshelf.plugin('registry');

module.exports = bookshelf;
