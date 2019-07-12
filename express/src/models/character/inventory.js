/**
 * @fileoverview Schema of a Character's inventory
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    fortune: {
        type: Number,
        min: 0
    },
    equipements: [
        {name: String, description: String, quantity:Number}
    ]
});

module.exports = inventorySchema;
