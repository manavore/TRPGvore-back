/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require('mongoose'); 
const helmet = require('helmet');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * Db section
 */
// Warning, hardcoded IP, todo change it
const uri = 'mongodb://172.17.0.2/test';

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection successful');
});

/**
 * Middleware section
 */
app.use(helmet());
app.use(cors());

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

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