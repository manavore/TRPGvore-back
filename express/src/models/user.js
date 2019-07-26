/**
 * @fileoverview Model class of a User
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
// Hash passwords
const saltRounds = 10;

// Creating a schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // only index, doesn't guarantee that only one exists
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      // select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Creating a model
const User = mongoose.model('User', userSchema);

module.exports = User;
