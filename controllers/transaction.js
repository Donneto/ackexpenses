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
        let docs;
        let query;
        let data = {
            income: 0,
            expense: 0,
            docs: []
        };

        try {
            // Validations
            if ( moment(startDate).isValid() === false ||  moment(endDate).isValid() === false) {
                return jsend.error('Invalid Date');
            }

            // If same day change query
            query = startDate === endDate ? { date: startDate } : { date: { $gte: startDate, $lte: endDate } };

            docs = await transactionCollection.find(query).sort({ date: 1 });

            if (docs.length) {
                // Build Up Response
                data.income = docs.filter( item => item.type === 'income');
                data.expense = docs.filter( item => item.type === 'expense');

                if (data.income.length) {
                    data.income = data.income.reduce( (acum, item) => acum + item.amount, 0);
                } else {
                    data.income = 0;
                }

                if (data.expense.length) {
                    data.expense = data.expense.reduce( (acum, item) => acum + item.amount, 0);
                } else {
                    data.expense = 0;
                }

                data.docs = docs;
            }
            
            console.log(data);
            
            return jsend.success(data);

        } catch(e) {
            return jsend.error('Something went wrong!');
        }
    };

    internals.create =  async (request, h) => {
        const data = request.payload;
        let transaction;
        let doc;

        try {

            transaction = new transactionCollection(data);
            doc = await transaction.save();
            
            return jsend.success(doc);

        } catch(e) {
            return jsend.error('Something went wrong!');
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
            return jsend.error('Something went wrong!');
        }    
    };

    internals.delete = async (request, h) => {
        const id = request.params.id || null;
        let result;

        try {

            if (id === null) {
                return jsend.error('ID must not be null');
            }

            result = await transactionCollection.deleteOne( { _id: id });
            
            return jsend.success(result);

        } catch (e) {
            return jsend.error('Something went wrong!');
        }
    };

// Exposing
    module.exports = internals;