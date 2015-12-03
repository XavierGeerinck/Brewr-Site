var Bookshelf = require('../');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');
var Organisation = require('./Organisation');

var Project = Bookshelf.model('Project', {
    tableName: 'project',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    hidden: [ 'users' ],
    virtuals: {
        members: function () {
            var members = this.related('users');
            members.push(this.related('created_by'));
            return members;
        }
    },
    owner: function () {
        return this.belongsTo('User');
    },
    created_by: function() {
        return this.belongsTo('User', 'created_by');
    },
    users: function () {
        return this.belongsToMany('User', 'project_user', 'project_id', 'user_id').withPivot('is_manager');
    },

    revisions: function () {
        return this.hasMany('ProjectRevision');
    },
    organisation: function () {
        return this.belongsTo('Organisation');
    },

    // many-to-many
    projectTeams: function() {
        return this.hasMany('ProjectTeam');
    },
    projectUsers: function () {
        return this.hasMany('ProjectUser');
    },
});

module.exports = Project;
