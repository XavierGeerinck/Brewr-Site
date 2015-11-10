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

lab.experiment('[Controller] User', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
    });

    lab.after(function (done) {
        return dbUtil.truncate().then(function() { done(); });
    });

    it('[GET] /user should return the correct user if authenticated', function (done) {
        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload).user.id).to.equal(fixtures['user'][0].id);
            expect(JSON.parse(res.payload).user.email).to.equal(fixtures['user'][0].email);
            expect(JSON.parse(res.payload).user.scope).to.equal(fixtures['user'][0].scope);
            expect(JSON.parse(res.payload).user.first_name).to.equal(fixtures['user'][0].first_name);
            expect(JSON.parse(res.payload).user.last_name).to.equal(fixtures['user'][0].last_name);
            expect(JSON.parse(res.payload).user.name).to.equal(fixtures['user'][0].name);
            expect(JSON.parse(res.payload).user.password).to.not.exist(); // Password hidden!

            done();
        });
    });

    it('[GET] /user should return an error of the bearer token is not a registered session', function (done) {
        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer blabla'
            }
        };

        server.inject(request, function (res) {
            expect(res.statusCode).to.equal(401);
            expect(JSON.parse(res.payload).error).to.equal('Unauthorized');

            done();
        });
    });

    it('[GET] /user should return the organisations I have access to with the projects in it that I have access to', function (done) {
        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            expect(JSON.parse(res.payload).user.organisations).to.exist;

            // Make sure that we have a projects key for every organisation
            JSON.parse(res.payload).user.organisations.forEach(function (org) {
                expect(org.projects).to.exist;
                expect(org.projects).to.not.equal(undefined);
            });

            done();
        });
    });

    it('[GET] /user should be able to be the creator of multiple organisations', function (done) {
        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();

            var organisationsCreated = 0;

            JSON.parse(res.payload).user.organisations.forEach(function (org) {
                if (org.created_by === fixtures['user_session'][0].user_id) {
                    organisationsCreated++;
                }
            });

            var organisationsCreatedFromSeed = 0;

            fixtures['organisation'].forEach(function (org) {
                if (org.created_by === fixtures['user_session'][0].user_id) {
                    organisationsCreatedFromSeed++;
                }
            });

            expect(organisationsCreated).to.equal(organisationsCreatedFromSeed);

            done();
        });
    });



    it('[GET] /user for a user that belongs to organisation and is not a manager or creator has scope "belongs-to-organisation-{params.organisation}-user"', function (done) {
        // Test data: User 1 belongs to organisations 2 as normal user
        // We expect: "belongs-to-organisation-2-user"
        var org = fixtures['organisation'][1];

        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-user');
            Code.expect(res.request.auth.credentials.scope).to.not.contain('belongs-to-organisation-' + org.uuid + '-manager');
            Code.expect(res.request.auth.credentials.scope).to.not.contain('belongs-to-organisation-' + org.uuid + '-creator');
            done();
        });
    });

    // // NOT IMPLEMENTED IN THE CODE FOR NOW
    // it('[GET] /user for a user that belongs to organisation and is a manager but not a creator has scope "belongs-to-organisation-{params.organisation}-user and manager"', function (done) {
    //     // Test data: User 1 belongs to organisations 2 as normal user
    //     // We expect: "belongs-to-organisation-2-user"
    //
    //     var request = {
    //         method: 'GET',
    //         url: '/user',
    //         headers: {
    //             Authorization: 'Bearer ' + fixtures['user_session'][0].token
    //         }
    //     };
    //
    //     server.inject(request, function (res) {
    //         Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-2-user');
    //         done();
    //     });
    // });

    it('[GET] /user for a user that is the creator of an organisation has scope "belongs-to-organisation-{params.organisation}-creator, manager and user"', function (done) {
        // We expect: "belongs-to-organisation-1-creator and belongs-to-organisation-1-manager"
        var org = fixtures['organisation'][0];

        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-user');
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-creator');

            done();
        });
    });

    it('[GET] /user for a user that has acces to a project of an organisation has scope belongs-to-organisation-<orguuid>-project-<projectid>-user', function (done) {
        var org = fixtures['organisation'][2];

        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-5-user');
            Code.expect(res.request.auth.credentials.scope).to.not.contain('belongs-to-organisation-' + org.uuid + '-project-5-manager');
            Code.expect(res.request.auth.credentials.scope).to.not.contain('belongs-to-organisation-' + org.uuid + '-project-5-creator');

            done();
        });
    });

    it('[GET] /user for a manager that has acces to a project of an organisation has scope belongs-to-organisation-<orguuid>-project-<projectid>-manager and user', function (done) {
        var org = fixtures['organisation'][1];

        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-3-user');
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-3-manager');
            Code.expect(res.request.auth.credentials.scope).to.not.contain('belongs-to-organisation-' + org.uuid + '-project-3-creator');

            done();
        });
    });

    it('[GET] /user for a creator that has acces to a project of an organisation has scope belongs-to-organisation-<orguuid>-project-<projectid>-creator, manager and user', function (done) {
        var org = fixtures['organisation'][0];

        var request = {
            method: 'GET',
            url: '/user',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-1-user');
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-1-manager');
            Code.expect(res.request.auth.credentials.scope).to.contain('belongs-to-organisation-' + org.uuid + '-project-1-creator');

            done();
        });
    });
});
