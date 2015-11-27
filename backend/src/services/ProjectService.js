var Boom = require('boom');
var uuid = require('node-uuid');
var async = require('async');
var User = require('../db/models/User');
var Project = require('../db/models/Project');
var ProjectUser = require('../db/models/ProjectUser');
var ProjectEnvInfo = require('../db/models/ProjectEnvInfo');
var ProjectFile = require('../db/models/ProjectFile');
var ProjectRevision = require('../db/models/ProjectRevision');
var Organisation = require('../db/models/Organisation');
var Promise = require('bluebird');

exports.getProjectByUUIDAndOrganisation = function (projectUUID) {
	return Project.where({ uuid: projectUUID }).fetch({ withRelated: [ 'created_by', 'users' ] });
};

exports.getProjectByIdAndOrganisation = function (projectId) {
	return Project.where({ id: projectId }).fetch({ withRelated: [ 'created_by', 'users', 'revisions' ] });
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

exports.create = function (organisationUUID, user, metaData, envInfo, files) {
	return new Promise(function (resolve, reject) {
		var projectObj;
		var projectRevisionObj;

		// First fetch the organisation
		Organisation.where({ uuid: organisationUUID }).fetch()
		.then(function (organisation) {
			if (!organisation) {
				return reject(Boom.badRequest('ORGANISATION_NOT_FOUND'));
			}

			return Project.forge({
				organisation_id: organisation.get('id'),
				created_by: user.get('id'),
				name: metaData.name,
				description: metaData.description,
				owner: user.get('id')
			})
			.save();
		})
		.then(function (project) {
			projectObj = project;

			return ProjectRevision.forge({
				project_id: project.get('id'),
				revision_number: uuid.v4()
			})
			.save();
		})
		.then(function (projectRevision) {
			projectRevisionObj = projectRevision;

			// Create the project files
	        async.each(files, function (file, cb) {
	            ProjectFile.forge({
	                project_revision: projectRevision.get('id'),
	                file_name: file.name,
	                file_data_uri: file.content
	            })
				.save()
				.then(function (file) {
					cb();
				})
				.catch(function (err) {
					cb(err);
				});
	        }, function (err) {
	            if (err) {
	                return Promise.reject(err);
	            }

	            return Promise.resolve(projectRevision);
	        });
		})
		.then(function (projectRevision) {
			return ProjectEnvInfo.forge({
				project_revision: projectRevisionObj.get('id'),
				distribution: envInfo.distribution,
				distribution_version: envInfo.distributionVersion,
				maintainer: envInfo.maintainer,
				label: envInfo.label, // isArray
				workdir: envInfo.workdir,
				user: envInfo.user,
				cmd: envInfo.cmd, // isArray
				run: envInfo.run, // isArray
				expose: envInfo.expose, // isArray
				env: envInfo.env, // isArray
				add: envInfo.add, // isArray
				copy: envInfo.copy, // isArray
				entrypoint: envInfo.entrypoint,
				volume: envInfo.volume, // isArray
				onbuild: envInfo.onbuild//, // isArray
				//source_code: envInfo.sourceCode, // TODO
				//startup_file_content: envInfo.startupFileContent, // TODO
				//startup_command: envInfo.startupCommand // TODO
			})
			.save();
		})
		.then(function () {
			return resolve(projectObj);
		})
		.catch(function (err) {
			return reject(err);
		});
	});
}

exports.getProjectImage = function (revisionUUID) {
	return new Promise(function (resolve, reject) {
		ProjectEnvInfo.where({ project_revision: revisionUUID })
		.fetch()
		.then(function (projectEnvInfo) {
			return resolve(projectEnvInfo);
		})
		.catch(function (err) {
			return reject(err);
		});
	});
}
