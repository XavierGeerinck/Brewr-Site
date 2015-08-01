/**
* OrganisationUser.js
*
* @description :: Represents the users that belong to an organisation
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'organisation_user',
  attributes: {
    addedOn: {
      type: 'datetime',
      columnName: 'added_on'
    },

    //associations
    user: {
      model: 'user',
      primaryKey: true
    },
    organisation: {
      model: 'organisation',
      primaryKey: true
    }
  }
};

