'use strict';

// Dependencies
    const moment = require('moment');
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

const transactionSchema = new Schema({
    description: String,
    date: Date,
    type: String,
    category: String,
    amount: Number,
    date_created: { type: Date, default: moment.utc()}
});

// Exposing
    module.exports = Mongoose.model('transaction', transactionSchema);