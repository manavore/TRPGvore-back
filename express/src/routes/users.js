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

router.get('/', (req,res) => { // todo remove it because it's sneaky dangerous x)
    User.find()
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/login', (req,res) => {
    const {name, password} = req.body; 

    User.findOne({name: name})
        .then(user => {
            
            if (!user) {
                // should redirect or something
            } else {
                bcrypt.compare(password, user.hash).then((res) => {
                    // res == true
                    console.log("welcome sir");
                });
            }

        })
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/register', (req, res) => {
    const {name, password, password2} = req.body; 

    User.findOne({name: name})
    .then((user) => {
        if (user || password.length < 5 || (password !== password2)) {
            console.log("test");
            res.status(400).json('Nope boy');
        } else {

            bcrypt.hash(password, saltRounds).then( (hash) => { // todo weird this variable isn't used
                
                const newUser = new User({name, hash});

                newUser.save()
            .then(() => res.status(201).json('User registered!'))
            .catch(err => res.status(400).json(`Error: ${err}`));

            });
        }
    });
});

module.exports = router;