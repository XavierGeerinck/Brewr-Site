var Bookshelf = require('../')
    , User = require('./User')
    , Team = require('./Team');

var ProjectTeam = Bookshelf.model('ProjectTeam', {
    tableName: 'project_team',
    idAttribute: [ 'user_id', 'team_id' ],
    project: function () {
        return this.belongsTo('Project');
    },
    team: function() {
        return this.belongsTo('Team');
    }
});

module.exports = ProjectTeam;
