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
    hidden: [ 'password', 'projects_access', 'projects_owned', 'organisations_access', 'organisations_owned' ], // Hide the password from view
    virtuals: {
        allOrganisations: function () {
            var organisations = this.related('organisations_owned');
            this.related('organisations_access').forEach(function (organisation) {
                organisations.push(organisation);
            });

            return organisations;
        },

        allProjects: function () {
            var projects = this.related('projects_owned');
            this.related('projects_access').forEach(function (project) {
                projects.push(project);
            });

            return projects;
        }
    },

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
        // We get the is_manager through the isPivot method, this fetches columns from the pivot table
        return this.belongsToMany('Project', 'project_user', 'user_id', 'project_id').withPivot('is_manager');
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
