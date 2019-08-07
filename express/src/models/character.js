/**
 * @fileoverview Schema of a Character
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

const { Schema } = mongoose;

const detailSchema = require('./character/detail');
const abilitySchema = require('./character/ability');
const inventorySchema = require('./character/inventory');
const detailsDefault = require('./character/default.conf/details.default');
const abilityDefault = require('./character/default.conf/ability.default');


const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    alive: {
      type: Boolean,
      default: true,
    },
    details: {
      type: [detailSchema],
      select: false,
      default: detailsDefault,
    },
    abilities: {
      type: [abilitySchema],
      select: false,
      default: abilityDefault,
    },
    inventory: { // todo should it be required?
      type: inventorySchema,
      select: false,
    },
    health: {
      type: [{
        type: Number,
        min: 0,
        max: 3,
      }],
      default: [0, 0, 0, 0, 0, 0, 0],
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Creating a model
const Character = mongoose.model('Character', characterSchema);
module.exports = Character;
