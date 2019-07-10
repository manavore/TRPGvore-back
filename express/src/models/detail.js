/**
 * @fileoverview Model class of the details of a character
 * @author Póvoa Tiago
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema
const detailsSchema = new Schema(
  {
    appearance: {
      type: String,
      required: false,
      trim: true,
      minlength: 3
    },
    expression: {
        type: String,
        required: false,
        trim: true,
        minlength: 3
      },
      technology: {
        type: String,
        required: false,
        trim: true,
        minlength: 3
      },
      education: {
        type: String,
        required: false,
        trim: true,
        minlength: 3
      },
      languages: {
        type: String,
        required: false,
        trim: true,
        minlength: 3
      }, // todo list incomplete
  },
  {
    timestamps: true
  }
);

// Creating a model
const Detail = mongoose.model("Detail", detailsSchema);

module.exports = Detail;
