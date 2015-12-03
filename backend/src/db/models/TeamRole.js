var Bookshelf = require('../')
    , User = require('./User')
    , Team = require('./Team');

var TeamRole = Bookshelf.model('TeamRole', {
    tableName: 'team_role',
    hasTimestamps: true,
    team: function() {
        return this.belongsTo('Team');
    },
    user: function() {
        return this.belongsTo('User');
    }
});

module.exports = TeamRole;