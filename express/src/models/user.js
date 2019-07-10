/**
 * @fileoverview Model class of a User
 * @author Póvoa Tiago
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    hash: {
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
const User = mongoose.model("User", userSchema);

module.exports = User;
