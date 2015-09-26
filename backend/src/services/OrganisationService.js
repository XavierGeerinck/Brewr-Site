var Promise = require('bluebird');
var OrganisationModel = require('../db/models/Organisation');
var OrganisationUserModel = require('../db/models/OrganisationUser');

/**
 * Gets the organisations where a user belongs to or has created
 * @param  {Integer} userId
 * @return {Promise}
 */
exports.getOrganisationsByUser = function(userId) {
    return new Promise(function (resolve, reject) {
        Promise.all([
            // Get the organisations where we belong to
            OrganisationUserModel.where({
                user_id: userId
            })
            .fetchAll({ withRelated: ['organisation', 'organisation.projects'] })
            .then(function (organisations) {
                return organisations;
            })
            .catch(function (err) {
                throw err;
            }),

            // Get the organisations we created or own
            OrganisationModel
            .query({ where: { created_by: userId }, orWhere: { owner: userId }})
            .fetchAll()
            .then(function (organisations) {
                return organisations;
            })
            .catch(function (err) {
                throw err;
            })
        ])
        .then(function (allOrganisations) {
            allOrganisations[0].models = allOrganisations[0].models.map(function (org) {
                return org.related('organisation');
            });

            var merged = allOrganisations[0].models.concat(allOrganisations[1].models);
            return resolve(merged);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
};

exports.createOrganisation = function (creatorId, name, description, logo) {
    var expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + parseInt(30));

    return new Promise(function (resolve, reject) {
        OrganisationModel.forge({
            name: name,
            description: description,
            logo: logo,
            subdomain: name.toLowerCase(),
            active: true,
            owner: creatorId,
            created_by: creatorId,
            user_limit: 10,
            project_limit: 10,
            expiry_time: expiryTime.toISOString()
        })
        .save()
        .then(function (organisation) {
            return resolve(organisation);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
}
