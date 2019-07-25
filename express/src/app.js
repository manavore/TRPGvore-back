/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

require('dotenv').config()
const cors = require("cors");
const helmet = require('helmet');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/**
 * Db section
 */
const db = require('./db');

/**
 * Middleware section
 */
app.use(helmet());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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
const users =       require('./routes/users');
const dice =        require('./routes/dice');
const characters =  require('./routes/characters');
const stories =     require('./routes/stories');

app.use('/auth', users);
app.use('/api/dice', dice);
app.use('/api/characters', characters);
app.use('/api/stories', stories);


const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));