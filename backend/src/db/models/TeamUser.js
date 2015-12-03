var Bookshelf = require('../')
    , User = require('./User')
    , Team = require('./Team');

var TeamUser= Bookshelf.model('TeamUser', {
    tableName: 'team_user',

    // many-to-one
    team: function () {
        return this.belongsTo('Team');
    },
    user: function() {
        return this.belongsTo('User');
    }
});

module.exports = TeamUser;
