var Bookshelf = require('../');
var User = require('./User');
var Organisation = require('./Organisation');

var OrganisationUser = Bookshelf.model('OrganisationUser', {
    tableName: 'organisation_user',
    organisation: function () {
        return this.belongsTo(Organisation);
    },
    user: function() {
        return this.belongsTo(User);
    }
});

module.exports = OrganisationUser;
