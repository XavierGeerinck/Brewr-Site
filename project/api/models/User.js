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
      columnName: 'email',
      required: true
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
    enabled: {
      type: 'boolean',
      defaultsTo: true
    },
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
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(values, next){
    AuthService.hashPassword(values);
    next();
  },
  beforeUpdate: function(values, next) {
    AuthService.hashPassword(values);
    next();
  }
};

