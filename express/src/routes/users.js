/**
 * @fileoverview Route of characters
 * @author Póvoa Tiago
 */

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

const saltRounds = 10; // Hashing salt rounds

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
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return res.status(401).body(error);
        }
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id

        const token = jwt.sign({ user }, 'top_secret'); // todo maybe hide this secret??
        // Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/loginold', (req, res) => {
  const { name, password } = req.body;

  User.findOne({ name: name })
    .then(user => {
      if (!user) {
        // should redirect or something
      } else {
        bcrypt.compare(password, user.hash).then(res => {
          // res == true
          console.log('welcome sir');
        });
      }
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/registerold', (req, res) => {
  const { name, password, password2 } = req.body;

  User.findOne({ name: name }).then(user => {
    if (user || password.length < 5 || password !== password2) {
      console.log('test');
      res.status(400).json('Nope boy'); // todo error code?
    } else {
      bcrypt.hash(password, saltRounds).then(hash => {
        // todo weird this variable isn't used
        const newUser = new User({ name, hash });

        newUser
          .save()
          .then(() => res.status(201).json('User registered!'))
          .catch(err => res.status(400).json(`Error: ${err}`));
      });
    }
  });
});

module.exports = router;
