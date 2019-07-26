/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require('express');

const app = express();

require('dotenv').config();
const cors = require('cors');
// const helmet = require('helmet');
const passport = require('passport');

/**
 * Db section
 */
require('./db');

/**
 * Middleware section
 */
// app.use(helmet());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(passport.initialize());


require('./auth/auth');

/**
 * Routes section
 */
const users = require('./routes/users');
const dice = require('./routes/dice');
const characters = require('./routes/characters');
const stories = require('./routes/stories');

app.use('/auth', users);
app.use('/api/dice', dice);
app.use('/api/characters', characters);
app.use('/api/stories', passport.authenticate('jwt', { session: false }), stories);

/**
 * Port and listen
 */
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
