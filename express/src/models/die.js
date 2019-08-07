/**
 * @fileoverview Model class of a die
 * @author Póvoa Tiago
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const chance = require('chance').Chance();

const dieSchema = new Schema(
  {
    value: {
      type: [Number],
      required: true,
    },
    number: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 10,
    },
    kind: {
      type: Number,
      required: true,
      default: 20,
      min: 4,
      max: 100,
    },
    owner: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

dieSchema.pre('save', function roll(next) {
  this.value = chance.rpg(`${this.number}d${this.kind}`);

  next();
});

// Creating a model
const Die = mongoose.model('Die', dieSchema);
module.exports = Die;
