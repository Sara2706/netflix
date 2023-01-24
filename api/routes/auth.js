const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString()
    })

    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json('Wrong Email');

        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            originalPassword !== req.body.password && res.status(401).json('Wrong password');

            if (originalPassword === req.body.password) {
                const accessToken = JWT.sign
                    (
                        {
                            id: user._id,
                            isAdmin: user.isAdmin
                        },
                        process.env.SECRET_KEY
                    )


                res.status(200).json({accessToken, user})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;