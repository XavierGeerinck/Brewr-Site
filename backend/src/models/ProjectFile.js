/**
* Project.js
*
* @description :: Represents a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'projectfile',
    tableName: 'project_file',
    connection: 'simple',
    attributes: {
        id: {
            type: 'integer',
            unique: true,
            primaryKey: true,
            columnName: 'id',
            autoIncrement: true
        },
        fileName: 'string',
        fileDataUri: 'text',
        createdOn: {
            type: 'datetime',
            columnName: 'created_on',
            defaultsTo: function() { return new Date(); }
        },

        //assocations
        projectRevision: {
            model: 'projectRevision'
        }
    }
};