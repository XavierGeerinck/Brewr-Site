'use strict';

// TEST SETUP
var Code = require('Code');
var Lab = require('lab');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var it = lab.it;
var expect = Code.expect;

// Test specific
var config = require(process.cwd() + '/config');
var dbUtil = require(process.cwd() + '/src/db/utils/dbUtil.js');
var server = require(process.cwd() + '/server');

lab.experiment('[Controller] User', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
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
});
