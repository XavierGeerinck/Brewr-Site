var Bookshelf = require('../');
var Project = require('./Project');
var Organisation = require('./Organisation');
var UserSession = require('./UserSession');


var User = Bookshelf.model('User', {
    tableName: 'user',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    hidden: [ 'password '], // Hide the password from view
    projects: function () {
        return this.belongsToMany('Project');
    },
    organisations: function () {
        return this.belongsToMany('Organisation');
    },
    sessions: function () {
        return this.hasMany('UserSession');
    }
});

module.exports = User;
