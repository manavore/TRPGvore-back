/**
 * @fileoverview Route of users
 * @author Póvoa Tiago
 */

const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  // todo remove it because it's sneaky dangerous x)
  User.find() // todo Find one!
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:userid', (req, res) => {
  const id = req.params.userid;
  const withDice = req.query.withDice === 'true' || req.query.withDice === '1'
    ? 'dice'
    : '';

  const withCharacters = req.query.withCharacters === 'true' || req.query.withCharacters === '1'
    ? 'characters'
    : '';

  User.findOne({ _id: id })
    .populate(withDice)
    .populate({
      path: withCharacters,
    })
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch('/:userid', (req, res) => {
  const id = req.params.userid;
  const { characterid, diceid } = req.body;

  User.findById({ _id: id })
    .then((u) => {
      if (characterid) {
        u.characters.push(characterid);
      }

      if (diceid) {
        u.set({ dice: diceid });
      }

      u.save();
      res.status(202).json(u);
    })
    .catch(err => res.status(404).json(`Error: ${err}`));
});

router.delete('/:userid', (req, res) => {
  const id = req.params.userid;

  User.deleteOne({ _id: id })
    .then(c => res.status(202).json(c))
    .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

module.exports = router;
