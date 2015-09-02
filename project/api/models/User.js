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
    ownerOf: {
      collection: 'Organisation',
      via: 'owner'
    },
    sessions: {
      collection: 'UserSession',
      via: 'user'
    },
    assignedTo: {
      collection: 'ProjectUser',
      via: 'user'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },

    isManagerOf: function(projectId) {

    },

  },
  beforeCreate: function(values, next){
    AuthService.hashPassword(values);
    next();
  },
  beforeUpdate: function(values, next) {
    AuthService.hashPassword(values);
    next();
  },

  /**
   * Check if the user is a member of the specified organisation
   * @param {Integer} userId, the id of the user
   * @param {Integer} organisationId, the id of the organisation
   */
  isMemberOf: function(userId, organisationId, cb) {

    User
      .findOne({"id": userId})
      .populate("memberOf")
      .populate("ownerOf")
      .exec(function(err, user){

        if(err){ console.log(err); return cb(false); }

        for(var i = 0; i < user.memberOf.length; i++) {
          if(user.memberOf[i].id == organisationId) {
            return cb(true);
          }
        }

        // user can also be the OWNER of the company
        for(var i = 0; i < user.ownerOf.length; i++) {
          if(user.ownerOf[i].id == organisationId) {
            return cb(true);
          }
        }

        // not related to this company
        return cb(false);
      });
  },

  assign: function(assigneeId, userId, projectId, cb) {

    User
      .find({"id": [assigneeId, userId]})
      .populate("assignedTo")
      .populate("ownerOf")
      .exec(function(err, users){

        var assignee = users[0];
        var user = (assigneeId == userId) ? users[0] : users[1];

        // need to be manager or owner of company to assign people
        //TODO: make sure owners can always assign
        var isManager = false;
        for(var i = 0; i < assignee.assignedTo.length; i++) {
          if(assignee.assignedTo[i].project == projectId) {
            if(assignee.assignedTo[i].isManager) {
              isManager = true;
            }
            break;
          }
        }

        if(isManager) {
          user.assignedTo.add(projectId);
          user.save(function(err, user){
            if(err){
              console.log(err);
              return cb(false);
            }
            return cb(true);
          });
        } else {
          return cb(false);
        }
      });
  }
};
