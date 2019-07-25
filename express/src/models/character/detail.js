/**
 * @fileoverview Schema of a Character's detail
 * @see Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  field: {
    type: String,
    required: false,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: false,
    trim: true,
    minlength: 0
  },
});

module.exports = detailSchema;
