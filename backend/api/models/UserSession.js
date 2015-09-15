/**
* UserSession.js
*
* @description :: Represents a session of a user
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'usersession',
    tableName: 'user_session',
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },
        createdOn: {
            type: 'datetime',
            columnName: 'created_on',
            defaultsTo: function() { return new Date(); }
        },
        token: 'string',
        userAgent: {
            type: 'string',
            columnName: 'user_agent'
        },
        ip: 'string',

        //associations
        user: {
            model: 'user'
        }
    }
};
