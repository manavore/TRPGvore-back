/**
 * @fileoverview Routes of stories
 * @author Póvoa Tiago
 */

const express = require("express");
const router = express.Router();

const Story = require('../models/story');

router.get('/', (req,res) => {
    Story.find()
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));

});

router.get('/:storyid', (req,res) => {
    const id = req.params.storyid;

    Story.find({_id : id})
        .then(c => res.json(c))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/', (req, res) => {
    const {title, content, chapters} = req.body;

    const newStory = new Story({title, content, chapters});

    newStory.save()
        .then(() => res.status(201).json('Story added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch('/:storyid', (req,res) => {
    const id = req.params.storyid;

    Story.updateOne({_id : id}, {$set: req.body})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); // todo maybe the error is too explicit, should be 404 ?
});

router.delete('/:storyid', (req,res) => {

    Story.deleteOne({_id : req.params.storyid})
        .then(c => res.status(200).json(c))
        .catch(err => res.status(400).json(`Error: ${err}`)); 

});

module.exports = router;