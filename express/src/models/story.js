/**
 * @fileoverview Schema of a Story
 * @author Póvoa Tiago
 */

const mongoose = require('../db');
const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    }
    // todo - we can add other stories to a story,
    // Though we should check if order is preserved or not.
    // chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}]
  },
  {
    timestamps: true
  }
);

// Creating a model
const Story = mongoose.model("Story", storySchema);

module.exports = Story;
