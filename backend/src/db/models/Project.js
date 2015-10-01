var Bookshelf = require('../');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');
var Organisation = require('./Organisation');

var Project = Bookshelf.model('Project', {
    tableName: 'project',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    owner: function () {
        return this.belongsTo('User');
    },
    created_by: function() {
        return this.belongsTo('User');
    },
    users: function () {
        return this.belongsToMany('User', 'project_user', 'user_id');
    },
    revision: function () {
        return this.belongsToMany('ProjectRevision');
    },
    organisation: function () {
        return this.belongsTo('Organisation');
    }
});

module.exports = Project;
