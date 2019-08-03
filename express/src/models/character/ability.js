/**
 * @fileoverview Schema of a Character's ability
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const abilitySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },
});

module.exports = abilitySchema;
