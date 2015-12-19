var Bookshelf = require('../');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');

var ProjectFile = Bookshelf.model('ProjectFile', {
    tableName: 'project_file',
    projectRevisions: function () {
        //                          model               jointable               col1                    col2
        return this.belongsToMany('ProjectRevision', 'project_revision_file', 'project_revision_id', 'project_file_id');
    },
    added_by: function () {
        return this.belongsTo('User');
    }
});

module.exports = ProjectFile;
