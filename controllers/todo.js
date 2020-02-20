'use strict';

// Dependencies
    const Jsend = require('jsend');

// Internals
    const internals = {};

// Methods
    internals.index = (request, h) => Jsend.success({ hello: 'World'});

// Exposing
    module.exports = internals;