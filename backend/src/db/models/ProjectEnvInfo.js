var Bookshelf = require('bookshelf');
var ProjectRevision = require('./ProjectRevision');

var ProjectEnvInfo = Bookshelf.Model.extend({
    tableName: 'project_env_info',
    project_revision: function () {
        return this.belongsTo(ProjectRevision);
    }
})
