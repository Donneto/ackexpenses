// Dependencies
    const Mongoose = require('mongoose');
    const Schema = Mongoose.Schema;

const transactionSchema = new Schema({
    description: String,
    date: Date,
    type: String,
    category: String,
    amount: Number
});

// Exposing
    module.exports = Mongoose.model('transaction', transactionSchema);