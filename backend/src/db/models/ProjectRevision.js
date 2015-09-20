var Bookshelf = require('../');
var Project = require('./Project');
var ProjectFile = require('./ProjectFile');
var ProjectUser = require('./ProjectUser');

var ProjectRevision = Bookshelf.Model.extend({
    tableName: 'project_revision',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    project: function () {
        return this.belongsTo(Project);
    },
    files: function () {
        return this.belongsToMany(ProjectFile);
    },
    users: function () {
        return this.belongsToMany(ProjectUser);
    }
});

module.exports = ProjectRevision;
