var Bookshelf = require('../');
var User = require('./User');
var Organisation = require('./Organisation');

var OrganisationUser = Bookshelf.Model.extend({
    tableName: 'organisation_user',
    organisation_id: function () {
        return this.belongsTo(Organisation);
    },
    user_id: function() {
        return this.belongsTo(User);
    }
});

module.exports = OrganisationUser;
