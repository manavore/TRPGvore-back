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

        const user = await User.createUser(newUser);

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
  let user = await User.findOne({ name })
    .select('password')
    .catch(err => done(err));

  if (!user) {
    return done(null, false, { message: 'Nope!' });
  }

  const validate = await user.isValidPassword(password);

  if (!validate) {
    return done(null, false, { message: 'Nope!' });
  }

  user = await User.findOne({ name });
  // Send the user information to the next middleware
  return done(null, user, { message: 'Logged in Successfully' });
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
