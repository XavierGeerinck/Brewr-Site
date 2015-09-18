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
     * Checks if the given userIds belong to the organisation
     * @param userIds
     * @param organisationId
     * @param cb
     */
    areMemberOf: function(userIds, organisationId, cb) {
        this
            .find()
            .where({or: userIds.map(function(userId){ return {"id": userId}; })})
            .populate("memberOf")
            .populate("ownerOf")
            .then(function (users) {

                var isMemberOf =[];

                for(var u = 0; u < users.length; u++) {
                    for (var i = 0; i < users[u].memberOf.length; i++) {
                        if (users[u].memberOf[i].id == organisationId) {
                            isMemberOf.push(true);
                            break;
                        }
                    }

                    // user can also be the OWNER of the company
                    for (var i = 0; i < users[u].ownerOf.length; i++) {
                        if (users[u].ownerOf[i].id == organisationId) {
                            isMemberOf.push(true);
                            break;
                        }
                    }
                }

                if(isMemberOf.length == users.length) {
                    return cb(true, users);
                }

                return cb(false, "Only " + isMemberOf.length + " are a member of this organisation");
            })
            .catch(function(err){
                return cb(false, err)
            });
    },

    /**
     * Returns if the user is a manager of
     * @param projectId
     * @param organisationId
     * @returns {boolean}
     */
    isManagerOf: function (assignee, project) {

        for (var i = 0; i < assignee.assignedTo.length; i++) {
            if (assignee.assignedTo[i].project == project.id && assignee.assignedTo[i].isManager) {
                return true;
            }
        }

        // if owner then automatically manager
        for (var i = 0; i < assignee.ownerOf.length; i++) {
            if (assignee.ownerOf[i].id == project.organisation) {
                return true;
            }
        }
        return false;

        //
        //var self = this;
        //
        //this
        //    .findOne({"id": userId})
        //    .populate("ownerOf")
        //    .populate("assignedTo")
        //    .then(function(user){
        //
        //        self.waterline.collections.project
        //            .findOne({"id": projectId})
        //            .then(function(project){
        //
        //                for (var i = 0; i < user.assignedTo.length; i++) {
        //                    if (user.assignedTo[i].project == projectId && user.assignedTo[i].isManager) {
        //                        return true;
        //                    }
        //                }
        //
        //                // if owner then automatically manager
        //                for (var i = 0; i < user.ownerOf.length; i++) {
        //                    if (user.ownerOf[i].id == project.organisation) {
        //                        return true;
        //                    }
        //                }
        //                return false;
        //
        //            })
        //            .catch(function(err){
        //                console.log(err);
        //                return true;
        //            });
        //    })
        //    .catch(function(err){
        //        console.log(err);
        //        return false;
        //    });
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

        var self = this;
        this
            .find()
            .where({or: [{ "id": assigneeId}, {"id": userId}]})
            .populate("assignedTo")
            .populate("ownerOf")
            .then(function (users) {

                // failsafe to prevent ids from getting mixed up in query
                var assignee = (users[0].id == assigneeId) ? users[0] : users[1];
                var user = (assigneeId == userId) ? users[0] : (users[0].id == assigneeId) ? users[1] : users[0];

                // get project
                self.waterline.collections.project
                    .findOne({"id": projectId})
                    .then(function(project){


                        var isManager = self.isManagerOf(assignee, project)
                        var isAssigned = user.isAssignedTo(projectId);

                        if (!isManager) {
                            return cb(false, "IS_NOT_MANAGER");
                        }
                        if(isAssigned) {
                            return cb(false, "IS_ALREADY_ASSIGNED");
                        }

                        var values = {"project": projectId, "user": user.id};

                        // create project-user
                        self.waterline.collections.projectuser
                            .create(values)
                            .then(function (projectUser) {
                                return cb(true);
                            })
                            .catch(function(err){
                                console.log(err); return cb(false);
                            });

                    })
                    .catch(function(err){
                        console.log(err); return cb(false);
                    });
            })
            .catch(function(err){
                console.log(err); return cb(false);
            });
    }
};
