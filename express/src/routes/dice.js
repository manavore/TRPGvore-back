/**
 * @fileoverview Route of dice
 * @author Póvoa Tiago
 */

const express = require('express');
const Die = require('../models/die');

// const chance = require('chance').Chance();
const router = express.Router();

router.get('/', (req, res) => {
  Die.find()
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:dieid', (req, res) => {
  const id = req.params.dieid;

  Die.findById({ _id: id })
    .then(c => res.json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/', (req, res) => {
  const { owner } = req.body;

  const newDie = new Die({ owner });

  newDie
    .save()
    .then(savedDie => res.status(201).json({ savedDie }))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/:dieid', (req, res) => {
  const id = req.params.dieid;
  const ownerid = req.body.owner;

  Die.findById({ _id: id })
    .then((d) => {
      d.owner = ownerid; // todo change this
      d.save()
        .then(savedDie => res.status(202).json(savedDie))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(404).json(`Error: ${err}`));
});

router.delete('/:dieid', (req, res) => {
  const id = req.params.dieid;

  Die.deleteOne({ _id: id })
    .then(c => res.status(200).json(c))
    .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

router.delete('/', (req, res) => {
  // todo can't remember but seems weird
  Die.deleteMany()
    .then(c => res.status(200).json(c))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
