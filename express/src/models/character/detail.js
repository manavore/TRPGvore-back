/**
 * @fileoverview Schema of a Character's detail
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const detailSchema = new Schema({
  field: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  description: {
    type: String,
    required: false,
    trim: true,
    minlength: 0,
    maxlength: 50,
  },
});

module.exports = detailSchema;
