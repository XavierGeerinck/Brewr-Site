// 'use strict';
//
// // TEST SETUP
// var Code = require('Code');
// var Lab = require('lab');
// var Hapi = require('hapi');
//
// var lab = exports.lab = Lab.script();
// var it = lab.it;
// var expect = Code.expect;
//
// // Test specific
// var config   = require(process.cwd() + '/config');
// var dbUtil   = require(process.cwd() + '/src/db/utils/dbUtil.js');
// var server   = require(process.cwd() + '/server');
// var fixtures = require(process.cwd() + '/src/db/seeds/data.json');
//
// var ProjectService = require(process.cwd() + '/src/services/ProjectService');
//
// lab.experiment('[Services] Project', function() {
//     lab.beforeEach(function (done) {
//         return dbUtil.truncate().then(dbUtil.seed).then(function() { done(); });
//     });
//
//     lab.after(function (done) {
//         return dbUtil.truncate().then(function() { done(); });
//     });
//
//
// 	// =====================
// 	// BASIC PROJECT
// 	// =====================
// 	it('A new project should be created with a uuid', function (done) {
//
// 	});
//
// 	it('getting a project should return a uuid as it\'s id', function (done) {
//
// 	});
// });
