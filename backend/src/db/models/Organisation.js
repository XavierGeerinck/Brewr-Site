var Bookshelf = require('../');
var User = require('./User');
var Project = require('./Project');

var Organisation = Bookshelf.model('Organisation', {
    tableName: 'organisation',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    owner: function () {
        return this.belongsTo(User);
    },
    created_by: function() {
        return this.belongsTo(User);
    },
    users: function () {
        return this.belongsToMany(User);
    },
    projects: function () {
        return this.hasMany('Project');
    }
});

module.exports = Organisation;
