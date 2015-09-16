/**
 * Created by Pencroff on 05.01.2015.
 */
/*global exports: true, require: true*/

var requireDir = require('require-dir'),
    _ = require('lodash'),
    Waterline = require('waterline'),
    WaterlineFixtures = require('waterline-fixtures'),
    orm = new Waterline();

var HapiWaterline = require('hapi-waterline');

exports.register = function (server, options, next) {
    var adapters = options.adapters || {},
        connections = options.connections || {},
        modelsDefault = options.models,
        bindFlag = options.decorateServer || false,
        fixturesPath = options.fixturesPath,
        path = options.path || [];


    if (bindFlag) {
        server.decorate('server', 'getModel', function (model) {
            return server.plugins['hapi-waterline'].models[model];
        });
    }

    if (_.isString(path)) {
        path = [path];
    }

    for(var i = 0; i < path.length; i++) {

        var models = requireDir(path[i], {recurse: true});
        var extendedModels = [];

        Object.keys(models).map(function(value, index){

            if (modelsDefault) {
                for(var j = 0; j < modelsDefault.length; j++) {
                    if(typeof(value[j]) === 'undefined'){
                        value[j] = modelsDefault[j];
                    }
                }
            }
            extendedModels.push(Waterline.Collection.extend(value));

        });

        for(var i = 0; i < extendedModels.length; i++) {
            orm.loadCollection(extendedModels[i]);
        }
    }

    orm.initialize({
        adapters: adapters,
        connections: connections
    }, function (err, models) {
        if(err) throw err;

        server.expose({
            orm: orm,
            models: models.collections,
            databases: models.connections
        });

        // load fixtures
        if(_.isString(fixturesPath)) {
            WaterlineFixtures.init({
                collections: models.collections,
                dir: fixturesPath,
                pattern: '*.json'
            }, next);
        } else {
            next();
        }
    });
};
exports.register.attributes = HapiWaterline.register.attributes;
exports.reset = HapiWaterline.reset;

    /*
var requireDir = require('require-dir'),
    _ = require('lodash'),
    Waterline = require('waterline'),
    WaterlineFixtures = require('waterline-fixtures'),
    orm = new Waterline();

// just for testing
exports.reset = function () {
    orm = new Waterline();
};

exports.register = function (server, options, next) {
    var adapters = options.adapters || {},
        connections = options.connections || {},
        modelsDefault = options.models,
        bindFlag = options.decorateServer || false,
        fixturesPath = options.fixturesPath,
        path = options.path || [];


    if (bindFlag) {
        server.decorate('server', 'getModel', function (model) {
            return server.plugins['hapi-waterline'].models[model];
        });
    }

    if (_.isString(path)) {
        path = [path];
    }

    _(path).forEach(function (item, index, collection) {
        var models = requireDir(item, {recurse: true});
        console.log(models);
        var extendedModels = _(models).map(function (model, key, object) {
            if (modelsDefault) {
                _(modelsDefault).forEach(function (value, key, object) {
                    if (typeof (model[key]) === 'undefined') {
                        model[key] = value;
                    }
                });
            }
            return Waterline.Collection.extend(model);
        });
        _(extendedModels).forEach(function (extendedModel) {
            orm.loadCollection(extendedModel)
        });
    });
    orm.initialize({
        adapters: adapters,
        connections: connections
    }, function (err, models) {
        if(err) throw err;

        server.expose({
            orm: orm,
            models: models.collections,
            databases: models.connections
        });

        console.log(models);

        // load fixtures
        if(_.isString(fixturesPath)) {
            WaterlineFixtures.init({
                collections: models.collections,
                dir: fixturesPath,
                pattern: '*.json'
            }, next);
        } else {
            next();
        }
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};             */