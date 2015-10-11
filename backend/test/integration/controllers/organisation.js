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


	// ==========================================
	// ADD/REMOVE/GET USERS TO/FROM ORGANISATION
	// ==========================================
    it('[GET] /organisation/:org_uuid/members should return the members of an organisation', function (done) {
        var orgUUID = fixtures['organisation'][0].uuid;

        var request = {
            method: 'GET',
            url: '/organisation/' + orgUUID + '/members',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload).length).to.be.above(0);

            done();
        });
	});

    it('[GET] /organisation/:org_uuid/members should return the members of an organisation, including the creator', function (done) {
        var orgUUID = fixtures['organisation'][0].uuid;

        var request = {
            method: 'GET',
            url: '/organisation/' + orgUUID + '/members',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload)).to.deep.include({ email: fixtures['user'][0].email });

            done();
        });
    });

    it('[GET] /organisation/:org_uuid/members should return one if no members epxect the creator', function (done) {
        var orgUUID = fixtures['organisation'][5].uuid;

        var request = {
            method: 'GET',
            url: '/organisation/' + orgUUID + '/members',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload).length).to.equal(1);

            done();
        });
    });

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
            expect(JSON.parse(res.payload).success).to.equal(true);

            // Now check if included
            var request = {
                method: 'GET',
                url: '/organisation/' + orgUUID + '/members',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][0].token
                }
            };

            server.inject(request, function (res) {
                expect(res.payload).to.exist();

                expect(JSON.parse(res.payload)).to.deep.include({ email: fixtures['user'][1].email });

                done();
            });
        });
	});

    it('[DELETE] /organisation/:org_uuid/members/:member_id should remove the member from this organisation', function (done) {
        var orgUUID = fixtures['organisation'][0].uuid;

        var request = {
            method: 'GET',
            url: '/organisation/' + orgUUID + '/members',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload)).to.deep.include({ email: fixtures['user'][5].email });

            // Now remove
            var request = {
                method: 'DELETE',
                url: '/organisation/' + orgUUID + '/members/6',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][0].token
                }
            };

            server.inject(request, function (res) {
                expect(res.payload).to.exist();
                expect(JSON.parse(res.payload).success).to.equal(true);

                // Now check if not included
                var request = {
                    method: 'GET',
                    url: '/organisation/' + orgUUID + '/members',
                    headers: {
                        Authorization: 'Bearer ' + fixtures['user_session'][0].token
                    }
                };

                server.inject(request, function (res) {
                    expect(res.payload).to.exist();
                    expect(JSON.parse(res.payload)).to.not.deep.include({ email: fixtures['user'][5].email });

                    done();
                });
            });
        });
    });

    it('[DELETE] /organisation/:org_uuid/members/:member_id should not be able to remove the creator', function (done) {
        var orgUUID = fixtures['organisation'][0].uuid;

        var request = {
            method: 'DELETE',
            url: '/organisation/' + orgUUID + '/members/' + fixtures['organisation'][0].created_by,
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();
            expect(JSON.parse(res.payload).success).to.equal(true);

            // Now check if not included
            var request = {
                method: 'GET',
                url: '/organisation/' + orgUUID + '/members',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][0].token
                }
            };

            server.inject(request, function (res) {
                expect(res.payload).to.exist();
                expect(JSON.parse(res.payload)).to.deep.include({ email: fixtures['user'][0].email });

                done();
            });
        });
    });
});
