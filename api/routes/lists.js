const router = require('express').Router();
const List = require('../models/List');
const verify = require('../verifyToken');

//Create
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body)

        try {
            const savedList = await newList.save();

            res.status(201).json(savedList)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//Update
router.put('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedList = await List.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });

            res.status(201).json(updatedList)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//Delete
router.delete('/:id', verify, async (req, res) => {
    if (req.user.isAdmin) {

        try {
            await List.findByIdAndDelete(req.params.id);

            res.status(200).json('List is deleted successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//Get
router.get('/', verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } },
                    { $sample: { size: 3 } }
                ])
            } else {
                if (typeQuery === 'series') {
                    list = await List.aggregate([
                        { $match: { type: typeQuery } },
                        { $sample: { size: 3 } }
                    ])
                } else if (typeQuery === 'movies') {
                    list = await List.aggregate([
                        { $match: { type: typeQuery } },
                        { $sample: { size: 3 } }
                    ])
                }
            }
        } else {
            if (req.user.isAdmin) {
                list = await List.find();
            } else {
                list = await List.aggregate([
                    { $sample: { size: 1 } },
                ])
            }
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;