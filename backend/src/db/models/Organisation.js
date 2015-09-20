var Bookshelf = require('bookshelf');
var User = require('./User');

var Organisation = Bookshelf.Model.extend({
    tableName: 'organisation',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    owner: function () {
        return this.belongsTo(User);
    },
    created_by: function() {
        return this.belongsTo(User);
    }
})
