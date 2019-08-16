/**
 * @fileoverview Database section
 * @author Póvoa Tiago
 */

const mongoose = require('mongoose');

// Warning, hardcoded IP, todo change it
const uri = process.env.DB_URL;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',
  () => {
    console.log('Connection successful to db');
  });

module.exports = mongoose;
