var Promise = require('bluebird');
var OrganisationModel = require('../db/models/Organisation');
var OrganisationUserModel = require('../db/models/OrganisationUser');
var UserModel = require('../db/models/User');
var OrganisationModel = require('../db/models/Organisation');

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

exports.addMemberByOrganisationUUID = function (organisationUUID, memberId, isManager) {
    var organisation = null;

    return new Promise(function (resolve, reject) {
        OrganisationModel
        .where({ uuid: organisationUUID })
        .fetch()
        .then(function (org) {
            organisation = org;

            return UserModel.where({ id: memberId }).fetch();
        })
        .then(function (user) {
            if (!user) {
                return Promise.reject('USER_DOES_NOT_EXIST');
            }

            return OrganisationUserModel
            .forge({
                user_id: memberId,
                organisation_id: organisation.get('id'),
                is_manager: isManager
            })
            .save();
        })
        .then(function () {
            return resolve();
        })
        .catch(function (err) {
            return reject(err);
        });
    });
};

exports.removeMemberByOrganisationUUID = function (organisationUUID, memberId) {
    return new Promise(function (resolve, reject) {
        OrganisationModel
        .where({ uuid: organisationUUID })
        .fetch()
        .then(function (org) {
            return OrganisationUserModel
            .where({
                user_id: memberId,
                organisation_id: org.get('id')
            })
            .destroy();
        })
        .then(function () {
            return resolve();
        })
        .catch(function (err) {
            return reject(err);
        });
    });
};

exports.getMembersByOrganisationUUID = function (organisationUUID, memberId) {
    return new Promise(function (resolve, reject) {
        OrganisationModel
        .where({ uuid: organisationUUID })
        .fetch({ withRelated: [ 'users', 'created_by' ] })
        .then(function (org) {
            var members = org.related('users');
            members.push(org.related('created_by'));

            // From here one we do not have the bookshelf objects!
            members = members.toJSON();

            members.forEach(function (member, index) {
                members[index].is_manager = (member._pivot_is_manager ||  org.related('created_by').get('id') === member.id) ? true : false;
                members[index].is_owner = org.related('created_by').get('id') === member.id;
            });

            return resolve(members);
        })
        .catch(function (err) {
            return reject(err);
        });
    });
};

exports.createOrganisation = function (creatorId, name, description, logo) {
    var expiryTime = new Date();
    expiryTime.setDate(expiryTime.getDate() + parseInt(30));

    return OrganisationModel
    .forge({
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
    .save();
}
