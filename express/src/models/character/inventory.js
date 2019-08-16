/**
 * @fileoverview Schema of a Character's inventory
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const equipementSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  effect: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: 100,
  },
  bonus: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: 100,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
    default: 1,
  },
});

const inventorySchema = new Schema({
  fortune: {
    type: Number,
    min: 0,
    max: 1000000,
    default: 1,
  },
  equipements: {
    type: [equipementSchema],
    default: [{
      name: 'Sac à dos',
      effect: 'spacieux et comfortable',
      bonus: '',
      quantity: 1,
    }],
  },
});

module.exports = inventorySchema;
