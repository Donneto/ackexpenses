'use strict';

// Dependencies
    const transactionController = require('../controllers/transaction');

// Internals
    const internals = {
        collection: 'transaction'
    };

// Exposing
    module.exports = [
        { method: 'GET', path: `/${internals.collection}/get/from/{startDate}/to/{endDate}`, handler: transactionController.getFrom },
        { method: 'POST', path: `/${internals.collection}`, handler: transactionController.create },
        { method: 'PUT', path: `/${internals.collection}`, handler: transactionController.update },
        { method: 'DELETE', path: `/${internals.collection}/{id}`, handler: transactionController.delete },
    ];