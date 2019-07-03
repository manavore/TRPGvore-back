/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

const Die = require('../models/die');

router.get('/', (req,res) => {
    const die = new Die();

    console.log(die);

    res.send(die);
});

module.exports = router;