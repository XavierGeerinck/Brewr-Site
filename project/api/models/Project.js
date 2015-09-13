/**
* Project.js
*
* @description :: Represents a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'project',
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
        name: {
            type: 'string',
            unique: true
        },
        description: 'string',
        imageUrl: {
            type: 'string',
            columnName: 'image_url'
        },
        deadline: 'datetime',
        archived: {
            type: 'boolean',
            defaultsTo: false
        },
        estimatedPrice: {
            type: 'float',
            columnName: 'estimated_price'
        },

        //assocations
        createdBy: {
            model: 'user',
            columnName: 'created_by'
        },
        organisation: {
            model: 'organisation'
        },
        revisions: {
            collection: 'projectRevision',
            via: 'project'
        },
        assignees: {
            collection: 'ProjectUser',
            via: 'project'
        }
    },
    beforeUpdate: function(values, next) {
        values.updatedOn = new Date();
        next();
    }

};
