/**
 * @fileoverview Routes of details (of characters)
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

const Detail = require('../models/detail');

router.get('/:detailid', (req,res) => {
    const id = req.params.detailid;

    Detail.find({_id : id})
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.post('/', (req, res) => {
    const appearance = req.body.appearance;

    const newDetail = new Detail({appearance});

    newDetail.save()
        .then(() => res.status(201).json('Detail added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;