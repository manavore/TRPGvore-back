/**
 * @fileoverview Model class of a Character
 * @author Póvoa Tiago
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema
const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

// Creating a model
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
