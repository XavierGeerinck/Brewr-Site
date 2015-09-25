var Bookshelf = require('../');
var User = require('./User');

var UserSession = Bookshelf.model('UserSession', {
    tableName: 'user_session',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    user: function () {
        return this.belongsTo('User', 'id');
    }
});

module.exports = UserSession;
