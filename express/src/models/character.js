/**
 * @fileoverview Model class of a die
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema
const characterSchema = new Schema({
  name:  {
      type: String,
      trim: true,
      minlength: 3
  }
});

// Creating a model
const Character = mongoose.model('Character', characterSchema);

module.exports = Character;