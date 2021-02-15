const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../db/models/User');

router.get('/', async (req, res) => {
    const userList = await User.find().exec();
    res.status(200).send(userList)
})

router.post('/signup', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            return res.status(401).send({
                response: err
            })
        } else {
            passport.authenticate('local')(req, res)
        }
    })
})

module.exports = router;