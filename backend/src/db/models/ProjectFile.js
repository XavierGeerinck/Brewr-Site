var Bookshelf = require('../');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');

var ProjectFile = Bookshelf.model('ProjectFile', {
    tableName: 'project_file',
    project_revision: function () {
        return this.belongsTo(ProjectRevision);
    },
    added_by: function () {
        return this.belongsTo(User);
    }
});

module.exports = ProjectFile;
