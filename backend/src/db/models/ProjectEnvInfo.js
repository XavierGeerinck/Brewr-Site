var Bookshelf = require('../');
var ProjectRevision = require('./ProjectRevision');

var ProjectEnvInfo = Bookshelf.model('ProjectEnvInfo', {
    tableName: 'project_env_info',
    // A projectEnvInfo always belongs to one or more revisions (more if not changed)
    projectRevision: function () {
        return this.hasMany('ProjectRevision');
    }
});

module.exports = ProjectEnvInfo;
