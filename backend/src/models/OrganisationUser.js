/**
* OrganisationUser.js
*
* @description :: Represents the users that belong to an organisation
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    identity: 'organisationuser',
    tableName: 'organisation_user',
    connection: 'simple',
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

        //associations
        user: {
            model: 'user'
        },
        organisation: {
            model: 'organisation'
        }
    }
};
