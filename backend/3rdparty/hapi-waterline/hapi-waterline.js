/**
 * Created by Pencroff on 05.01.2015.
 */
/*global exports: true, require: true*/

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
};