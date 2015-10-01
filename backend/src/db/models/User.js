var bcrypt = require('bcrypt');
var Bookshelf = require('../');
var Project = require('./Project');
var Organisation = require('./Organisation');
var OrganisationUser = require('./OrganisationUser');
var ProjectUser = require('./ProjectUser');
var UserSession = require('./UserSession');
var ITERATIONS = 10;

var User = Bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    hidden: [ 'password'], // Hide the password from view

    // On creation, hash the password
    initialize: function() {
        this.on('creating', this.hashPassword, this);
    },

    hashPassword: function (model, attrs, options) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(model.attributes.password, ITERATIONS, function (err, hash) {
                if (err) {
                    return reject(err);
                }

                model.set('password', hash);

                return resolve(hash);
            });
        });
    },
    sessions: function () {
        return this.hasMany('UserSession');
    },
    // The projects we got access too
    projects_access: function () {
        return this.belongsToMany('Project', 'project_user', 'user_id', 'project_id');
    },
    // Projects owned are the ones by the created_by field
    projects_owned: function () {
        return this.hasMany('Project', 'created_by');
    },
    // The organisations we got access too
    organisations_access: function () {
        return this.belongsToMany('Organisation', 'organisation_user', 'user_id', 'organisation_id');
    },
    // Organisations owned are the ones by the created_by field
    organisations_owned: function () {
        return this.hasMany('Organisation', 'created_by');
    },

});

module.exports = Bookshelf.model('User', User);
