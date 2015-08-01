/**
* ProjectUser.js
*
* @description :: Represents the users assigned to a project
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'project_user',
  attributes: {
    addedOn: {
      type: 'datetime',
      columnName: 'added_on'
    },
    deadline: 'datetime',
    isManager: {
      type: 'boolean',
      defaultsTo: 'false'
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

