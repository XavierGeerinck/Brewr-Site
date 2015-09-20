var Bookshelf = require('bookshelf');
var User = require('./User');
var Organisation = require('./Organisation');

var Organisation = Bookshelf.Model.extend({
    tableName: 'organisation_user',
    organisation_id: function () {
        return this.belongsTo(Organisation);
    },
    user_id: function() {
        return this.belongsTo(User);
    }
})
