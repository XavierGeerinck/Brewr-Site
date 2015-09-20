var Bookshelf = require('bookshelf');
var Project = require('./Project');

var ProjectRevision = Bookshelf.Model.extend({
    tableName: 'project_revision',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    project_id: function () {
        return this.belongsTo(Project);
    }
})
