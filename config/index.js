'use strict';

// Dependencies
    const Confidence = require('confidence');
    const Path = require('path');

// Plugins
    const RouterPG = require('../plugins/router');
    const DatabasePG = require('../plugins/database');

const internals = {
    defaults: {
        env: process.env.NODE_ENV || 'dev'
    },
    mongo: {
        uri: 'mongodb+srv://acklenuser:acklenuser@acklen-qxhpw.mongodb.net/acklexpenses?retryWrites=true&w=majority',
        dbName: 'acklexpenses',
        mongoOptions: {
            user: 'acklen',
            pass: 'acklen'
        }
    }
};

internals.config = {
    root: Path.resolve(__dirname, '../'),
    env: internals.defaults.env,
    manifest: {
        server: {
            port: {
                $filter: 'env',
                prd: 8080,
                $default: process.env.PORT
            },
            host: {
                $filter: 'env',
                prd: '127.0.0.1',
                $default: 'localhost'
            },
            routes: {
                cors: true
            }
        },
        register: {
            plugins: [
                { plugin: RouterPG, options: { root: Path.resolve(__dirname, '../') } },
                { plugin: DatabasePG, options: internals.mongo }
            ]
        }
    },
    options: {
        relativeTo: __dirname
    }
};

internals.store = new Confidence.Store(internals.config);

// Exposing
    exports.get = (key, opts = {}) => {
        const criteria = Object.assign({}, internals.defaults, opts);

        return internals.store.get(key, criteria);
    };