var Bookshelf = require('../');
var User = require('./User');
var Project = require('./Project');

var ProjectUser = Bookshelf.Model.extend({
    tableName: 'project_user',
    project_id: function () {
        return this.belongsTo(Project);
    },
    user_id: function() {
        return this.belongsTo(User);
    }
});

module.exports = ProjectUser;
