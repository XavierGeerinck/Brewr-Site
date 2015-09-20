var Promise = require('bluebird');
var OrganisationModel = require('../db/models/Organisation');

exports.getOrganisationsByUser = function(user) {
    console.log(user);
    console.log(OrganisationModel);

    return new Promise(function (resolve, reject) {
        return resolve();
    });
};
