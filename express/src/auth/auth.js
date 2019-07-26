/**
 * @fileoverview Passport middlewares
 * @author Póvoa Tiago
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


// User registration handler
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    async (name, password, done) => {
      try {
        const newUser = new User({ name, password });

        const user = await newUser.save();

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// User login handler
passport.use('login', new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, async (name, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await User.findOne({ name });
    if (!user) {
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'Nope!' });
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Nope!' });
    }
    // Send the user information to the next middleware
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTStrategy({
  // the extractjwt will check Authorization Header BearerToken
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
}, async (jwtPayload, cb) => {
  try {
    const user = await User.findOne(jwtPayload.name);
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
}));
