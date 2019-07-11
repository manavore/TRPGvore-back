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

    Character.findById({_id : id})
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/', (req, res) => {
    const {name, details} = req.body;

    const newCharacter = new Character({name, details});

    newCharacter.save()
        .then(savedCharacter => res.status(201).json({savedCharacter}))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch('/:characterid', (req,res) => {
    const id = req.params.characterid;
    // const newName = req.body.name;

    Character.updateOne({_id : id}, {$set: req.body})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

router.delete('/:characterid', (req,res) => {
    const id = req.params.characterid;

    Character.deleteOne({_id : id})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?

});

module.exports = router;