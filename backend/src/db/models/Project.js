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
    // Reference to the many to many table, used to remove projects
    projectUsers: function () {
        return this.hasMany('ProjectUser');
    },
    revision: function () {
        return this.belongsToMany('ProjectRevision');
    },
    organisation: function () {
        return this.belongsTo('Organisation');
    }
});

module.exports = Project;
