var Bookshelf = require('bookshelf');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');

var ProjectFile = Bookshelf.Model.extend({
    tableName: 'project_file',
    project_revision: function () {
        return this.belongsTo(ProjectRevision);
    },
    added_by: function () {
        return this.belongsTo(User);
    }
})
