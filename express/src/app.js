/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require('mongoose'); 

/**
 * Db section
 */
// Warning, hardcoded IP, todo change it
const uri = 'mongodb://172.17.0.2/test';

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection successful');
});

/**
 * Middleware section
 */
app.use(cors());

/**
 * Routes section
 */
const dice = require('./routes/dice');
const characters = require('./routes/characters');

app.use('/api/dice', dice);
app.use('/api/characters', characters);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));