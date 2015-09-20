var Bookshelf = require('../');
var User = require('./User');
var ProjectRevision = require('./ProjectRevision');

var Project = Bookshelf.Model.extend({
    tableName: 'project',
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
    revision: function () {
        return this.belongsToMany(ProjectRevision);
    }
});

module.exports = Project;
