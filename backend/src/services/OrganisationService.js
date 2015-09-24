var Promise = require('bluebird');
var OrganisationModel = require('../db/models/Organisation');

exports.getOrganisationsByUser = function(user) {
    console.log(user);
    console.log(OrganisationModel);

    return new Promise(function (resolve, reject) {
        OrganisationModel.forge({
            // JOIN organisation user?
        })
        .fetchAll()
        .then(function (organisations) {
            return resolve(organisations);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
};

exports.createOrganisation = function (creator, name, description, logo) {
    return new Promise(function (resolve, reject) {
        OrganisationModel.forge({
            name: name,
            description: description,
            logo: logo,
            subdomain: name.toLowerCase(),
            active: true,
            owner: creator,
            created_by: creator,
            user_limit: 10,
            project_limit: 10,
            expiry_time: new Date() + 30
        })
        //. // Create thing
        .then(function (organisation) {
            return resolve(organisation);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
}
