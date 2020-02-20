'use strict';

// Dependencies
const Confidence = require('confidence');
const Path = require('path');

const internals = {
    defaults: {
        env: process.env.NODE_ENV || 'dev'
    },
};

internals.config = {
    root: Path.resolve(__dirname, '../'),
    env: internals.defaults.env,
    manifest: {
        server: {
            port: 3000,
            host: 'localhost',
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