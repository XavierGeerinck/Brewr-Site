'use strict';

// TEST SETUP
var Code = require('Code');
var Lab = require('lab');
var Hapi = require('hapi');
var Joi = require('joi');

var lab = exports.lab = Lab.script();
var it = lab.it;
var expect = Code.expect;

// Test specific
var config   = require(process.cwd() + '/config');
var dbUtil   = require(process.cwd() + '/src/db/utils/dbUtil.js');
var server   = require(process.cwd() + '/server');
var fixtures = require(process.cwd() + '/src/db/seeds/data.json');

var OrganisationService = require(process.cwd() + '/src/services/OrganisationService');

lab.experiment('[Services] Organisation', function() {
    lab.beforeEach(function (done) {
        return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
    });

    lab.after(function (done) {
        return dbUtil.truncate().then(function() { done(); });
    });


	// =====================
	// BASIC ORGANISATION
	// =====================
	it('A new organisation should be created with a uuid', function (done) {
		OrganisationService.createOrganisation(fixtures['user'][0].id, 'random name', 'some description')
		.then(function (org) {

			var schema = Joi.string().guid();
			Joi.validate(org.get('id'), schema, function (err, value) {
				Code.expect(err).to.not.exist();
				Code.expect(value).to.equal(org.get('id'));

				done();
			});
		})
		.catch(function (err) {
			Code.expect(err).to.not.exist();
		});
	});

	it('getting a organisation by the user should return a uuid as their id', function (done) {
		OrganisationService.getOrganisationsByUser(fixtures['user'][0].id)
		.then(function (orgs) {
			orgs.forEach(function (org) {
				var schema = Joi.string().guid();
				Joi.validate(org.get('id'), schema, function (err, value) {
					Code.expect(err).to.not.exist();
					Code.expect(value).to.equal(org.get('id'));
				});
			});

			done();
		})
		.catch(function (err) {
			Code.expect(err).to.not.exist();
		});
	});
});
