/**
 * @fileoverview Route of characters
 * @author Póvoa Tiago
 */

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  // todo remove it because it's sneaky dangerous x)
  User.find() // todo Find one!
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.status(201).json({
      message: 'User registered',
      user: req.user,
    });
  },
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(err);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return res.status(401).body(error);
        }
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        const token = jwt.sign({ user }, process.env.TOKEN_SECRET); // todo maybe hide this secret??
        // Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
