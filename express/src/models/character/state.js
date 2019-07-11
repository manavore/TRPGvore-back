/**
 * @fileoverview Schema of a Character's state
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('../../db');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    health: [{type: Number, min: 0}],
    sanity: {
        type: Number,
    },
    faith: {
        type: Number,
    },
    conditions: [{condition:String}]
});

module.exports = stateSchema;
