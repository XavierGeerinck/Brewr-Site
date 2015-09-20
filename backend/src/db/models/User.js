var Bookshelf = require('bookshelf');
var Project = require('./Project');
var Organisation = require('./Organisation');
var UserSession = require('./UserSession');

var User = Bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    projects: function () {
        return this.belongsToMany(Project);
    },
    organisations: function () {
        return this.belongsToMany(Organisation);
    },
    sessions: function () {
        return this.belongsToMany(UserSession);
    }
})
