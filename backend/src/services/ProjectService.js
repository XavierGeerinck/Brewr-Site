var Project = require('../db/models/Project');
var ProjectUser = require('../db/models/ProjectUser');
var Organisation = require('../db/models/Organisation');
var Promise = require('bluebird');

exports.getProjectByUUIDAndOrganisation = function (projectUUID) {
	return Project.where({ uuid: projectUUID }).fetch({ withRelated: [ 'created_by', 'users' ] });
};

exports.getProjectByIdAndOrganisation = function (projectId) {
	return Project.where({ id: projectId }).fetch({ withRelated: [ 'created_by', 'users' ] });
};

exports.deleteProjectByUUIDAndOrganisation = function (organisationUUID, projectId) {
	return new Promise(function (resolve, reject) {
		// First remove the many to many table relation
		ProjectUser
		.where({ project_id: projectId }).destroy()
		.then(function (success) {
			return Organisation.where({ uuid: organisationUUID }).fetch();
		})
		.then(function (organisation) {
			// Then remove the main project reference
			return Project.where({ id: projectId, organisation_id: organisation.get('id') }).destroy();
		})
		.then(function () {
			return resolve();
		})
		.catch(function (err) {
			return reject(err);
		});
	});
};

exports.deleteProjectByIdAndOrganisation = function (organisationId, projectId) {
	return new Promise(function (resolve, reject) {
		// First remove the many to many table relation
		ProjectUser
		.where({ project_id: projectId }).destroy()
		.then(function (success) {
			// Then remove the main project reference
			return Project.where({ id: projectId, organisation_id: organisationId }).destroy();
		})
		.then(function () {
			return resolve();
		})
		.catch(function (err) {
			return reject(err);
		});
	});
};
