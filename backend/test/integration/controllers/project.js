'use strict';

// TEST SETUP
var Code = require('Code');
var Lab = require('lab');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var it = lab.it;
var expect = Code.expect;

// Test specific
var config   = require(process.cwd() + '/config');
var dbUtil   = require(process.cwd() + '/src/db/utils/dbUtil.js');
var server   = require(process.cwd() + '/server');
var fixtures = require(process.cwd() + '/src/db/seeds/data.json');

lab.experiment('[Controller] Project', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
    });

    lab.after(function (done) {
        return dbUtil.truncate().then(function() { done(); });
    });


	// =====================
	// ADD USERS TO PROJECT
	// =====================
	// it('[POST] /project/:id/members/:member_id should require that the member_id is a member of the organisation', function (done) {
	//
	// });
	//
	// it('[POST] /project/:id/members/:member_id should assign the member to a project of the organisation', function (done) {
	//
	// });
	//
	// it('[POST] /project/:id/members/:member_id should be able to add managers through a payload parameter', function (done) {
	//
	// });
	//
	// it('[POST] /project/:id/members/:member_id should only allow belongs-to-organisation-<orgid>-creator or manager to add managers to a project', function (done) {
	//
	// });
	//
	// it('[POST] /project/:id/members/:member_id requires belongs-to-organisation-<orgid>-project-<projectid>-manager or creator scope', function (done) {
	//
	// });
	//
	// it('[DELETE] /project/:id/members/:member_id should remove the member of a project of an organisation', function (done) {
	//
	// });
	//
	// it('[DELETE] /project/:id/members/:member_id requires belongs-to-organisation-<orgid>-project-<projectid>-manager or creator scope', function (done) {
	//
	// });

	// ==============
	// PROJECT CRUD
	// ==============
	it('[GET] /organisation/:org_uuid/project/:id should return an error if I do not have sufficient rights for it', function (done) {
        var orgUUID = fixtures['organisation'][2].uuid;

		var request = {
			method: 'GET',
			url: '/organisation/' + orgUUID + '/project/7',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).message).to.equal('Insufficient scope, expected any of: belongs-to-organisation-' + orgUUID + '-project-7-user');

			done();
		});
	});

	it('[GET] /organisation/:org_uuid/project/:id should return detailed information about the project such as team members', function (done) {
        var orgUUID = fixtures['organisation'][1].uuid;

		var request = {
			method: 'GET',
			url: '/organisation/' + orgUUID + '/project/3',
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).members).to.exist();
			expect(JSON.parse(res.payload).members[0].email).to.equal(fixtures['user'][0].email);
			expect(JSON.parse(res.payload).members[0].first_name).to.equal(fixtures['user'][0].first_name);
			expect(JSON.parse(res.payload).members[0].last_name).to.equal(fixtures['user'][0].last_name);
			expect(JSON.parse(res.payload).members.length).to.equal(2);
			done();
		});
	});

	it('[DELETE] /organisation/:org_uuid/project/:id can only be executed with the correct manager rights', function (done) {
        var orgUUID = fixtures['organisation'][2].uuid;

		var request = {
			method: 'DELETE',
			url: '/organisation/' + orgUUID + '/project/5',
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).message).to.equal('Insufficient scope, expected any of: belongs-to-organisation-' + orgUUID + '-project-5-manager');

			done();
		});
	});

	it('[DELETE] /organisation/:org_uuid/project/:id without a correct id should return an error about scope', function (done) {
        var orgUUID = fixtures['organisation'][1].uuid;

		var request = {
			method: 'DELETE',
			url: '/organisation/' + orgUUID + '/project/30000',
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).message).to.equal('Insufficient scope, expected any of: belongs-to-organisation-' + orgUUID + '-project-30000-manager');

			done();
		});
	});

	it('[DELETE] /organisation/:org_uuid/project/:id should require the password of the logged in user', function (done) {
        var orgUUID = fixtures['organisation'][1].uuid;

		var request = {
			method: 'DELETE',
			url: '/organisation/' + orgUUID + '/project/3',
			payload: {
				password: fixtures['user'][0].raw_password
			},
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).message).to.equal('child \"password\" fails because [\"password\" is required]');

			done();
		});
	});

	it('[DELETE] /organisation/:org_uuid/project/:id should throw an error if the password is wrong', function (done) {
        var orgUUID = fixtures['organisation'][1].uuid;

		var request = {
			method: 'DELETE',
			url: '/organisation/' + orgUUID + '/project/3',
			payload: {
				password: 'WRONGPASSWORD'
			},
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();

			expect(JSON.parse(res.payload).message).to.equal('WRONG_PASSWORD');

			done();
		});
	});

	it('[DELETE] /organisation/:org_uuid/project/:id should delete the project if the password and scope are correct', function (done) {
        var orgUUID = fixtures['organisation'][1].uuid;

		var request = {
			method: 'DELETE',
			url: '/organisation/' + orgUUID + '/project/3',
			payload: {
				password: fixtures['user'][0].password_raw
			},
			headers: {
				Authorization: 'Bearer ' + fixtures['user_session'][0].token
			}
		};

		server.inject(request, function (res) {
			expect(res.payload).to.exist();
            expect(JSON.parse(res.payload).success).to.equal(true);

			done();
		});
	});
});
