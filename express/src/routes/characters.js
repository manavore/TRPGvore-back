/**
 * @fileoverview Routes of characters
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

const Character = require('../models/character');

router.get('/', (req,res) => {
    Character.find()
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.get('/:characterid', (req,res) => {
    const id = req.params.characterid;

    Character.find({_id : id})
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/', (req, res) => {
    const name = req.body.name;
    const details = req.body.details;

    const newCharacter = new Character({name, details});

    newCharacter.save()
        .then(() => res.status(201).json('Character added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch('/:characterid', (req,res) => {
    const id = req.params.characterid;
    const newName = req.body.name;

    Character.updateOne({_id : id}, {$set: {name: req.body.name }})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

router.delete('/:characterid', (req,res) => {
    const id = req.params.characterid;

    Character.remove({_id : id})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?

});

/*
const details = require('./details');

router.use('/cat/details', details);
 * 
 */

module.exports = router;