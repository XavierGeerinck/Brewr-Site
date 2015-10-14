var User = require('../db/models/User');
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

exports.getMembersByOrganisationUUIDAndProjectId = function (organisationUUID, projectId) {
	return new Promise(function (resolve, reject) {
		Organisation.where({ uuid: organisationUUID }).fetch()
		.then(function (org) {
			return Project
			.where({ organisation_id: org.get('id'), id: projectId })
			.fetch({ withRelated: [ 'users', 'created_by' ] });
		})
		.then(function (project) {
			var members = project.related('users');
			members.push(project.related('created_by'));

			// From here on, it is not a bookshelf object!
			members = members.toJSON();

            members.forEach(function (member, index) {
                members[index].is_manager = (member._pivot_is_manager ||  project.related('created_by').get('id') === member.id) ? true : false;
                members[index].is_owner = project.related('created_by').get('id') === member.id;
            });

			return resolve(members);
		})
		.catch(function (err) {
			return reject(err);
		})
	});
};

exports.addMemberByOrganisationUUIDAndProjectId = function (organisationUUID, projectId, memberId, isManager) {
	return new Promise(function (resolve, reject) {
		User
		.where({ id: memberId })
		.fetch()
		.then(function (user) {
			if (!user) {
				return Promise.reject('USER_DOES_NOT_EXIST');
			}

			return Organisation
			.where({ uuid: organisationUUID })
			.fetch();
		})
		.then(function (org) {
			return ProjectUser.forge({
				is_manager: isManager,
				user_id: memberId,
				project_id: projectId
			})
			.save();
		})
		.then(function (projectUser) {
			return resolve();
		})
		.catch(function (err) {
			return reject(err);
		})
	});
};

exports.removeMemberByOrganisationUUIDAndProjectId = function (organisationUUID, projectId, memberId) {
	return new Promise(function (resolve, reject) {
		User
		.where({ id: memberId })
		.fetch()
		.then(function (user) {
			if (!user) {
				return Promise.reject('USER_DOES_NOT_EXIST');
			}

			return ProjectUser
			.where({ project_id: projectId, user_id: memberId })
			.destroy();
		})
		.then(function () {
			return resolve();
		})
		.catch(function (err) {
			return reject(err);
		})
	});
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
