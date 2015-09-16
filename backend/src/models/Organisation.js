/**
* Organisation.js
*
* @description :: Represents the organisation
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'organisation',
    tableName: 'organisation',
    connection: 'simple',
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
        updatedOn: {
            type: 'datetime',
            columnName: 'updated_on'
        },
        name: 'string',
        description: 'string',
        logo: 'string',
        subdomain: 'string',
        userLimit: {
            type: 'integer',
            columnName: 'user_limit'
        },
        projectLimit: {
            type: 'integer',
            columnName: 'project_limit'
        },
        expiryTime: {
            type: 'datetime',
            columnName: 'expiry_time'
        },
        deletionTime: {
            type: 'datetime',
            columnName: 'deletion_time'
        },
        active: {
            type: 'boolean',
            defaultsTo: 'true'
        },
        //associations
        createdBy: {
            model: 'user',
            columnName: 'created_by'
        },
        owner: {
            model: 'user'
        }
    },
    beforeUpdate: function(values, next) {
        values.updatedOn = new Date();
        next();
    }
};
