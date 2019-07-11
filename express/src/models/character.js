/**
 * @fileoverview Model class of a Character
 * @author Póvoa Tiago
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema of a detail line inside a character
 * @see CharacterSchema
 */
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
    minlength: 3
  },
});

// Creating a schema
const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    details: [detailSchema]
  },
  {
    timestamps: true
  }
);

// Creating a model
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
