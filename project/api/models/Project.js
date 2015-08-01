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
      primarKey: true,
      columnName: 'id',
      autoIncrement: true
    },
    createdOn: {
      type: 'datetime',
      columnName: 'created_on'
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

    //assocations
    createdBy: {
      model: 'user'
    },
    organisation: {
      model: 'organisation'
    },
    revisions: {
      collection: 'projectRevision',
      via: 'project'
    }
  }
};

