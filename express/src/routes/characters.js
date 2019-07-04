/**
 * @fileoverview Entrypoint of this app
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

module.exports = router;