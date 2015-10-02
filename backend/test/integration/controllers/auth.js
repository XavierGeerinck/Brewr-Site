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

lab.experiment('[Controller] Auth', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(function () { return dbUtil.seed() }).then(function() { done(); });
    });

    lab.after(function (done) {
        return dbUtil.truncate().then(function() { done(); });
    });

    it('[POST] /auth/signup should return an error if no parameters', function (done) {
        var request = {
            method: 'POST',
            url: '/auth/signup'
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload).error).to.equal('Bad Request');
            done();
        });
    });

    it('[POST] /auth/signin should return a token upon succesfull login', function (done) {
        var request = {
            method: 'POST',
            url: '/auth/signin',
            payload: {
                email: fixtures['user'][0].email,
                password: fixtures['user'][0].password_raw
            }
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload).token).to.exist();
            expect(JSON.parse(res.payload).token).to.be.a.string();

            done();
        });
    });

    it('[POST] /auth/signin should return an error if invalid credentials', function (done) {
        var request = {
            method: 'POST',
            url: '/auth/signin',
            payload: {
                email: fixtures['user'][0].email,
                password: 'Somewrongpassword'
            }
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload).error).to.equal('Unauthorized');

            done();
        });
    });

    it('[GET] /auth/logout should return success upon logout', function (done) {
        var request = {
            method: 'GET',
            url: '/auth/logout',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.equal("true");

            done();
        });
    });

    it('[GET] /auth/logout should not allow me to login with the same token after logout', function (done) {
        var request = {
            method: 'GET',
            url: '/auth/logout',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            request = {
                method: 'GET',
                url: '/auth/session',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][0].token
                }
            };

            server.inject(request, function (res) {
                expect(JSON.parse(res.payload).error).to.equal('Unauthorized');

                done();
            });
        });
    });

    it('[DELETE] /auth/session/{token} should delete the session with the token', function (done) {
        var request = {
            method: 'DELETE',
            url: '/auth/session/' + fixtures['user_session'][0].token,
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload).success).to.equal(true);

            request = {
                method: 'GET',
                url: '/auth/session',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][1].token
                }
            };

            server.inject(request, function (res) {
                expect(JSON.parse(res.payload).length).to.equal(1);
                expect(JSON.parse(res.payload)[0].token).to.equal(fixtures['user_session'][1].token);

                done();
            });
        });
    });

    it('[DELETE] /auth/session should remove all sessions expect the current one!', function (done) {
        var request = {
            method: 'DELETE',
            url: '/auth/session',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload).success).to.equal(true);

            request = {
                method: 'GET',
                url: '/auth/session',
                headers: {
                    Authorization: 'Bearer ' + fixtures['user_session'][0].token
                }
            };

            server.inject(request, function (res) {
                expect(JSON.parse(res.payload).length).to.equal(1);

                done();
            });
        });
    });

    it('[GET] /auth/session returns all the user it\'s sessions', function (done) {
        var request = {
            method: 'GET',
            url: '/auth/session',
            headers: {
                Authorization: 'Bearer ' + fixtures['user_session'][0].token
            }
        };

        server.inject(request, function (res) {
            expect(JSON.parse(res.payload)[0].token).to.equal(fixtures['user_session'][0].token);
            expect(JSON.parse(res.payload)[0].ip).to.equal(fixtures['user_session'][0].ip);
            expect(JSON.parse(res.payload)[0].user_agent).to.equal(fixtures['user_session'][0].user_agent);
            expect(JSON.parse(res.payload)[0].user_id).to.equal(fixtures['user_session'][0].user_id);

            expect(JSON.parse(res.payload)[1].token).to.equal(fixtures['user_session'][1].token);
            expect(JSON.parse(res.payload)[1].ip).to.equal(fixtures['user_session'][1].ip);
            expect(JSON.parse(res.payload)[1].user_agent).to.equal(fixtures['user_session'][1].user_agent);
            expect(JSON.parse(res.payload)[1].user_id).to.equal(fixtures['user_session'][1].user_id);

            expect(JSON.parse(res.payload).length).to.equal(fixtures['user_session'].length);
            done();
        });
    });

    it('[POST] /auth/signin for a user that belongs to organisation and is not a manager or creator has scope "belongs-to-organisation-{params.organisation}-user"', function (done) {
        var request = {
            method: 'POST',
            url: '/auth/signin',
            payload: {
                email: fixtures['user'][0].email,
                password: fixtures['user'][0].password_raw
            }
        };

        server.inject(request, function (res) {
            // console.log(res);
            done();
        });
    });

    it('[POST] /auth/signin for a user that belongs to organisation and is a manager but not a creator has scope "belongs-to-organisation-{params.organisation}-user and manager"', function (done) {
        done();
    });

    it('[POST] /auth/signin for a user that is the creator of an organisation has scope "belongs-to-organisation-{params.organisation}-creator, manager and user"', function (done) {
        done();
    });

    it('[POST] /auth/signin for a maanger that has acces to a project of an organisation has scope belongs-to-organisation-<orgid>-project-<projectid>-user', function (done) {
        done();
    });

    it('[POST] /auth/signin for a user that has acces to a project of an organisation has scope belongs-to-organisation-<orgid>-project-<projectid>-manager and user', function (done) {
        done();
    });

    it('[POST] /auth/signin for a creator that has acces to a project of an organisation has scope belongs-to-organisation-<orgid>-project-<projectid>-creator, manager and user', function (done) {
        done();
    });
});
