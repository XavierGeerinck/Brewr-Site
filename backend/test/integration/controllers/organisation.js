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

lab.experiment('[Controller] Organisation', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
    });

    lab.after(function (done) {
        return dbUtil.truncate().then(function() { done(); });
    });


	// =====================
	// ADD USERS TO ORGANISATION
	// =====================
	it('[POST] /organisation/:org_uuid/members/:member_id should assign the member to this organisation', function (done) {
        var orgUUID = fixtures['organisation'][5].uuid;

        var request = {
            method: 'POST',
            url: '/organisation/' + orgUUID + '/members/2',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            console.log(res.payload);

            done();
        });
	});

    // Get members
    // Get members should include the creator
    // Delete member
});
