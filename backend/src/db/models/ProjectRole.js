var Bookshelf = require('../')
    , User = require('./User')
    , Project = require('./Project');

var ProjectRole = Bookshelf.model('ProjectRole', {
    tableName: 'project_role',
    hasTimestamps: true,
    project: function() {
        return this.belongsTo('Project');
    },
    user: function() {
        return this.belongsTo('User');
    }
});

module.exports = ProjectRole;