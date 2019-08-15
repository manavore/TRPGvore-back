/**
 * @fileoverview Schema of a Character's inventory
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const skillSchema = new Schema({
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
  type: {
    type: String,
    required: true,
    trim: true,
    minlength: 0,
    maxlength: 100,
    default: 'Actif',
    enum: ['Actif', 'Passif'],
  },
});

module.exports = skillSchema;
