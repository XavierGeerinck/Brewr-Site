var Project = require('../db/models/Project');
var ProjectUser = require('../db/models/ProjectUser');
var Promise = require('bluebird');

exports.getProjectByIdAndOrganisation = function (projectId) {
	return Project.where({ id: projectId }).fetch({ withRelated: [ 'created_by', 'users' ] });
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
