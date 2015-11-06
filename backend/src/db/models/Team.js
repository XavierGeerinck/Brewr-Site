var Bookschelf = require('../')
    , User = require('./User')
    , Organisation = require('./Organisation')
    , Project = require('./Project')
    , ProjectTeam = require('./ProjectTeam');

var Team = Bookschelf.model('Team', {

    tableName: 'team',
    hasTimestamps: true,
    team_leader: function() {
        return this.belongsTo('User');
    },
    organisation: function() {
        return this.belongsTo('Organisation');
    },
    created_by: function() {
        return this.belongsTo('User');
    },

    // many-to-many
    projectTeams: function() {
        return this.hasMany('ProjectTeam');
    },

    // one-to-many
    members: function(){
        return this.belongsToMany('User');
    },
    projects: function() {
        return this.belongsToMany('Project');
    }
});

module.exports = Team;