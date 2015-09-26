var bcrypt = require('bcrypt');
var Bookshelf = require('../');
var Project = require('./Project');
var Organisation = require('./Organisation');
var UserSession = require('./UserSession');
var ITERATIONS = 10;

var User = Bookshelf.model('User', {
    tableName: 'user',
    hasTimestamps: true, // Define that we update the created_at and updated_at on change
    hidden: [ 'password '], // Hide the password from view

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

    projects: function () {
        return this.belongsToMany('Project');
    },
    organisations: function () {
        return this.belongsToMany('Organisation');
    },
    sessions: function () {
        return this.hasMany('UserSession');
    }
});

module.exports = User;
