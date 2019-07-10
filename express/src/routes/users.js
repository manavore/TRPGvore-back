/**
 * @fileoverview Route of characters
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

// Hash passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

router.get('/', (req,res) => {
    User.find()
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/register', (req, res) => {
    const {name, password, password2} = req.body; // todo validity check

    User.findOne({name: name})
    .then((user) => {
        if (user || password.length < 5 || (password !== password2)) {
            console.log("test");
            res.status(400).json('Nope boy');
        } else {

            bcrypt.hash(password, saltRounds, function(err, hash) {
                
                const newUser = new User({name, hash});

                newUser.save()
            .then(() => res.status(201).json('User registered!'))
            .catch(err => res.status(400).json(`Error: ${err}`));

            })
            .catch(err => res.status(400).json(`Error: ${err}`));
        }
    });
});

module.exports = router;