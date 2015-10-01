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

    it('[POST] /user should return succes on creation', function (done) {
        var request = {
            method: 'POST',
            url: '/auth/signup',
            payload: {
                email: '1@1.be',
                password: 'somepassword',
                firstName: 'John',
                lastName: 'Doe'
            }
        };

        server.inject(request, function (res) {
            expect(res.payload).to.exist();
            expect(JSON.parse(res.payload).email).to.equal(request.payload.email);

            // Make sure the pass gets hashed!
            expect(JSON.parse(res.payload).password).to.not.equal(request.payload.password);

            expect(JSON.parse(res.payload).first_name).to.equal(request.payload.firstName);
            expect(JSON.parse(res.payload).last_name).to.equal(request.payload.lastName);

            done();
        });
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

    it('[GET] /user should return the organisations I have access to', function (done) {

    });

    it('[GET] /user should return the projects I have access to', function (done) {

    });
});
