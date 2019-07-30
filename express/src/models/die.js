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
  this.value = chance.rpg('1d20');
  next();
});

// Creating a model
const Die = mongoose.model('Die', dieSchema);
module.exports = Die;
