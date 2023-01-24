const router = require('express').Router();
const Movie = require('../models/Movie');
const verify = require('../verifyToken');

//Create
router.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)

        try {
            const savedMovie = await newMovie.save();

            res.status(201).json(savedMovie)
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
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });

            res.status(201).json(updatedMovie)
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
            await Movie.findByIdAndDelete(req.params.id)

            res.status(201).json('The movie deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

//Get
router.get('/find/:id', verify, async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id)

        res.status(201).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }

});

//Get random
router.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    const genreQuery = req.query.genre;
    let movie;
    try {
        if (type === 'series') {
            if (genreQuery) {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true, genre: genreQuery } },
                    { $sample: { size: 1 } },
                ])
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true, } },
                    { $sample: { size: 1 } },
                ])
            }
        } else if(type === 'movies'){
            if (genreQuery) {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false, genre: genreQuery } },
                    { $sample: { size: 1 } },
                ])
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false, } },
                    { $sample: { size: 1 } },
                ])
            }
        }else{
            movie = await Movie.aggregate([
                { $sample: { size: 1 } },
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }

});

//Get all
router.get('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find()

            res.status(201).json(movies.reverse())
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json('You are not allowed')
    }
})

module.exports = router;