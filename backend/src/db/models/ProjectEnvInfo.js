var Bookshelf = require('../');
var ProjectRevision = require('./ProjectRevision');

var ProjectEnvInfo = Bookshelf.model('ProjectEnvInfo', {
    tableName: 'project_env_info',
    project_revision: function () {
        return this.belongsTo(ProjectRevision);
    }
});

module.exports = ProjectEnvInfo;
