'use strict';

// Dependencies
    const categoryController = require('../controllers/category');

// Internals
    const internals = {
        collection: 'category'
    };

// Exposing
    module.exports = [
        { method: 'GET', path: `/${internals.collection}`, handler: categoryController.get },
        { method: 'POST', path: `/${internals.collection}`, handler: categoryController.create },
        { method: 'PUT', path: `/${internals.collection}`, handler: categoryController.update },
        { method: 'DELETE', path: `/${internals.collection}/{id}`, handler: categoryController.delete },
    ];