/**
* User.js
*
* @description :: Contains the User model data, represents a user of an organisation
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'user',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'id',
      autoIncrement: true
    },
    email: {
      type: 'email',
      unique: true,
      columnName: 'email'
    },
    password: 'string',
    createdOn: {
      type: 'datetime',
      columnName: 'created_on'
    },
    updatedOn: {
      type: 'datetime',
      columnName: 'updated_on'
    },
    enabled: 'boolean',
    expiresOn: {
      type: 'datetime',
      columnName: 'expires_on'
    },
    scope: 'array',

    // associations
    memberOf: {
      collection: 'OrganisationUser',
      via: 'user'
    },
    sessions: {
      collection: 'UserSession',
      via: 'user'
    }
  }
};

