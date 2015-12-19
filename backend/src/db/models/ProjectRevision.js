var Bookshelf = require('../');
var Project = require('./Project');
var ProjectFile = require('./ProjectFile');
var ProjectUser = require('./ProjectUser');

var ProjectRevision = Bookshelf.model('ProjectRevision', {
    tableName: 'project_revision',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    users: function () {
        return this.belongsToMany('ProjectUser');
    },
    project: function () {
        return this.belongsTo('Project');
    },
    // Many to many, a file can belong to multiple revs since we can reuse them if not changed
    projectFiles: function () {
        //                          model               jointable               col1                    col2
        return this.belongsToMany('ProjectFile', 'project_revision_file', 'project_file_id', 'project_revision_id');
    },
    // A projectRevision always has an environmentInfo
    projectEnvInfo: function () {
        return this.belongsTo('ProjectEnvInfo');
    }
});

module.exports = ProjectRevision;
