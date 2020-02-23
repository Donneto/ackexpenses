'use strict';

// Dependencies
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;
    const moment = require('moment');

const categorySchema = new Schema({
    name: String,
    date_created: { type: Date, default: moment.utc()}
});

// Exposing
module.exports = Mongoose.model('category', categorySchema);