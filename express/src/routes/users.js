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

        const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: '1h' }); // todo maybe hide this secret??
        // Send back the token to the user
        return res.status(202).send({ token, user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.patch('/:userid', (req, res) => {
  const id = req.params.userid;
  const { characterid, diceid } = req.body;

  User.findById({ _id: id })
    .then((u) => {
      u.characters.push(characterid);

      if (diceid) {
        u.set({ dice: diceid });
      }

      u.save();
      res.status(202).json(u);
    })
    .catch(err => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
