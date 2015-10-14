var Bookshelf = require('../');
var User = require('./User');
var Project = require('./Project');

var ProjectUser = Bookshelf.model('ProjectUser', {
    tableName: 'project_user',
    idAttribute: [ 'user_id', 'project_id' ],
    project: function () {
        return this.belongsTo('Project');
    },
    user: function() {
        return this.belongsTo('User');
    }
});

module.exports = ProjectUser;
