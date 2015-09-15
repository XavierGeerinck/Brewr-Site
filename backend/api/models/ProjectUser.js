/**
* ProjectUser.js
*
* @description :: Represents the users assigned to a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'projectuser',
    tableName: 'project_user',
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },
        addedOn: {
            type: 'datetime',
            columnName: 'added_on',
            defaultsTo: function() { return new Date(); }
        },
        isManager: {
            type: 'boolean',
            defaultsTo: 'false',
            columnName: 'is_manager'
        },

        //associations
        user: {
            model: 'user'
        },
        project: {
            model: 'project'
        }
    }
};
