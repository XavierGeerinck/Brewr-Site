var Bookshelf = require('bookshelf');

var User = Bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
})
