/**
 * @fileoverview Route to auth a user and get a token
 * @author Póvoa Tiago
 */

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// const User = require('../models/user');

const router = express.Router();

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

        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); // todo maybe hide this secret??
        // Send back the token to the user
        return res.status(202).send({ token, user });
      });
    } catch (error) {
      return next(info);
    }
  })(req, res, next);
});

module.exports = router;
