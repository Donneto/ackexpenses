'use strict';

// Dependencies
    const Mongoose = require('mongoose');

// Internals
    const internals = {};

// Exposing
    exports.plugin = {
        name: 'databse',
        version: '1.0.0',
        register: async (server, options) => {
            const MongOptions = Object.assign({},{useNewUrlParser: true},options.mongoOptions);
            
            Mongoose.connect( options.uri, MongOptions, err => {
                if(err) throw err;

                console.log('Successfully connected to Mongo database');

                return true;
            });
        }
    };
