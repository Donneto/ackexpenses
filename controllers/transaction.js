'use strict';

// Dependencies
    const jsend = require('jsend');
    const transactionCollection = require('../models/transaction');
    const moment = require('moment');

// Internals
    const internals = {};

// Methods
    internals.getFrom = async (request, h) =>  {
        const startDate = request.params.startDate;
        let endDate = request.params.endDate;
        let data;
        let query;

        try {
            // Validations
            if ( moment(startDate).isValid() === false ||  moment(endDate).isValid() === false) {
                return jsend.error('Invalid Date');
            }

            // If same day change query
            query = startDate === endDate ? { date: startDate } : { date: { $gte: startDate, $lte: endDate } };

            data = await transactionCollection.find(query);
            
            return jsend.success(data);

        } catch(e) {
            throw e;
        }
    };

    internals.create =  async (request, h) => {
        const data = request.payload;

        try {

            const transaction = new transactionCollection(data);
            const doc = await transaction.save();
            
            return jsend.success(doc);

        } catch(e) {
            throw e;
        }
        
        
    };

    internals.update =  async (request, h) => {
        const data = request.payload;
        const { startDate, endDate } = data;
        let transaction;
        
        try {
            
            // Validations
            if ( moment(startDate).isValid() === false ||  moment(endDate).isValid() === false) {
                return jsend.error('Invalid Date');
            }

            transaction = await transactionCollection.findOne({ _id: data._id });

            transaction = Object.assign(transaction, data);
            
            await transaction.save();

            return jsend.success(transaction);

        } catch(e) {
            throw e;
        }    
    };

    internals.delete = async (request, h) => {
        
    };

// Exposing
    module.exports = internals;