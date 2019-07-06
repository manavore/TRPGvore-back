/**
 * @fileoverview Route of characters
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

router.post('/', (req, res) => {
    const name = req.body.name;

    const newCharacter = new Character({name});

    newCharacter.save()
        .then(() => res.status(201).json('Character added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;