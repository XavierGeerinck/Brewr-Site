/**
* ProjectRevision.js
*
* @description :: Represents the revisions of a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'projectrevision',
    tableName: 'projectrevision',
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
        imageUrl: {
            type: 'string',
            columnName: 'image_url'
        },
        archived: {
            type: 'boolean',
            defaultsTo: false
        },
        estimatedPrice: {
            type: 'float',
            columnName: 'estimated_price'
        },
        revisionDate: {
            type: 'datetime',
            columnName: 'revision_date'
        },
        revisionNumber: {
            type: 'string',
            columnName: 'revision_number'
        },

        //assocations
        createdBy: {
            model: 'user',
            columnName: 'created_by'
        },
        organisation: {
            model: 'organisation'
        },
        project: {
            model: 'project'
        },
        files: {
            collection: 'projectFile',
            via: 'projectRevision'
        },
        projectEnvInfo: {
            model: 'projectEnvInfo'
        }
    }
};
