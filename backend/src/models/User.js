/**
 * User.js
 *
 * @description :: Contains the User model data, represents a user of an organisation
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var AuthService = require('../services/AuthService.js');

module.exports = {
    identity: 'user',
    tableName: 'user',
    connection: 'simple',
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
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

        isManagerOf: function (projectId) {
            for (var i = 0; i < this.assignedTo.length; i++) {
                if (this.assignedTo[i].project == projectId && this.assignedTo[i].isManager) {
                    return true;
                }
            }
            return false;
        },

        isAssignedTo: function (projectId) {

            for (var i = 0; i < this.assignedTo.length; i++) {
                if (this.assignedTo[i].project == projectId) {
                    return true;
                }
            }

            return false;
        }

    },
    beforeCreate: function (values, next) {
        // Hash the password
        if (values.password) {
            values.password = AuthService.hashPassword(values.password);
        }

        // Callback
        next();
    },
    beforeUpdate: function (values, next) {
        // Hash password
        if (values.password) {
            values.password = AuthService.hashPassword(values.password);
        }

        // Set updated field
        values.updatedOn = new Date();

        // Callback
        next();
    },

    /**
     * Check if the user is a member of the specified organisation
     * @param {Integer} userId, the id of the user
     * @param {Integer} organisationId, the id of the organisation+
     * @param {Function} cb, the callback function when the action is completed
     * @return {Function} cb, the given callback with the result as parameter
     */
    isMemberOf: function (userId, organisationId, cb) {
        this
            .findOne({"id": userId})
            .populate("memberOf")
            .populate("ownerOf")
            .exec(function (err, user) {

                if (err) {
                    console.log(err);
                    return cb(false);
                }

                for (var i = 0; i < user.memberOf.length; i++) {
                    if (user.memberOf[i].id == organisationId) {
                        return cb(true);
                    }
                }

                // user can also be the OWNER of the company
                for (var i = 0; i < user.ownerOf.length; i++) {
                    if (user.ownerOf[i].id == organisationId) {
                        return cb(true);
                    }
                }

                // not related to this company
                return cb(false);
            });
    },

    /**
     * Assign a user to a project, given an assignerId
     * @param {Integer} assigneeId, the ID of the assigner
     * @param {Integer} userId, the ID of the user that we want to assign
     * @param {Integer} projectId, the ID of the project where we want to assign the user to
     * @param {Function} cb, the callback function
     * @return {Function}, the callback function with the result
     */
    assign: function (assigneeId, userId, projectId, cb) {
        this
            .find({"id": [assigneeId, userId]})
            .populate("assignedTo")
            .populate("ownerOf")
            .exec(function (err, users) {

                // failsafe to prevent ids from getting mixed up in query
                var assignee = (users[0].id == assigneeId) ? users[0] : users[1];
                var user = (assigneeId == userId) ? users[0] : (users[0].id == assigneeId) ? users[1] : users[0];

                // need to be manager or owner of company to assign people
                //TODO: make sure owners can always assign


                if (assignee.isManagerOf(projectId) && !user.isAssignedTo(projectId)) {

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
