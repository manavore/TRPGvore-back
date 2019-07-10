/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require('mongoose'); 
var helmet = require('helmet');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
app.use(helmet());
app.use(cors());

/**
 * Routes section
 */
const dice = require('./routes/dice');
const users = require('./routes/users');
const characters = require('./routes/characters');

app.use('/auth', users);
app.use('/api/dice', dice);
app.use('/api/characters', characters);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));