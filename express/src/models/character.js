/**
 * @fileoverview Schema of a Character
 * @author Póvoa Tiago
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema = require('./character/detail');
const inventorySchema = require('./character/inventory');

const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    details: [detailSchema],
    inventory: inventorySchema // todo should if be required?    
  },
  {
    timestamps: true
  }
);

// Creating a model
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
