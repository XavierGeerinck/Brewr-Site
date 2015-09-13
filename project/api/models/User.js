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
            via: 'owner',
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
            for(let i = 0; i < this.assignedTo.length; i++) {
                if(this.assignedTo[i].project == projectId && this.assignedTo[i].isManager) {
                    return true;
                }
            }
            return false;
        },

        isAssignedTo: function(projectId) {

            for(let i = 0; i < this.assignedTo.length; i++) {
                if(this.assignedTo[i].project == projectId) {
                    return true;
                }
            }

            return false;
        }

    },
    beforeCreate: function(values, next){
        AuthService.hashPassword(values);
        next();
    },
    beforeUpdate: function(values, next) {
        AuthService.hashPassword(values);
        values.updatedOn = new Date();
        next();
    },

    /**
    * Check if the user is a member of the specified organisation
    * @param {Integer} userId, the id of the user
    * @param {Integer} organisationId, the id of the organisation+
    * @param {Function} cb, the callback function when the action is completed
    */
    isMemberOf: function(userId, organisationId, cb) {

        User
        .findOne({"id": userId})
        .populate("memberOf")
        .populate("ownerOf")
        .exec(function(err, user){

            if(err){ console.log(err); return cb(false); }

            for(let i = 0; i < user.memberOf.length; i++) {
                if(user.memberOf[i].id == organisationId) {
                  cb(true);
                }
            }

            // user can also be the OWNER of the company
            for(let i = 0; i < user.ownerOf.length; i++) {
                if(user.ownerOf[i].id == organisationId) {
                  cb(true);
                }
            }

            // not related to this company
            cb(false);
        });
    },

    assign: function(assigneeId, userId, projectId, cb) {

        User
        .find({"id": [assigneeId, userId]})
        .populate("assignedTo")
        .populate("ownerOf")
        .exec(function(err, users){

            // failsafe to prevent ids from getting mixed up in query
            var assignee = (users[0].id == assigneeId) ? users[0] : users[1];
            var user = (assigneeId == userId) ? users[0] : (users[0].id == assigneeId) ? users[1] : users[0];

            // need to be manager or owner of company to assign people
            //TODO: make sure owners can always assign


            if(assignee.isManagerOf(projectId) && !user.isAssignedTo(projectId)) {

                var values = {"project": projectId, "user": user.id};

                ProjectUser
                .create(values, function (err, projectUser) {
                    if (err) {
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
