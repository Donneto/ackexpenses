'use strict';

// Dependencies
    const jsend = require('jsend');
    const categoryCollection = require('../models/category');

// Internals
    const internals = {};

// Methods
    internals.get = async (request, h) =>  {
        let docs;

        try {
          
            docs = await categoryCollection.find({}).sort({ name: 1 });
            
            return jsend.success(docs);

        } catch(e) {
            return jsend.error('Something went wrong!');
        }
    };

    internals.create =  async (request, h) => {
        const data = request.payload;
        let category;
        let doc;
        
        try {

            category = new categoryCollection(data);
            doc = await category.save();
            
            return jsend.success(doc);

        } catch(e) {
            return jsend.error('Something went wrong!');
        }
    };

    internals.update =  async (request, h) => {
        const data = request.payload;
        let category;
        
        try {
            
            category = await categoryCollection.findOne({ _id: data._id });

            category = Object.assign(category, data);
            
            await category.save();

            return jsend.success(category);

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

            result = await categoryCollection.deleteOne( { _id: id });
            
            return jsend.success(result);

        } catch (e) {
            return jsend.error('Something went wrong!');
        }
    };

// Exposing
    module.exports = internals;