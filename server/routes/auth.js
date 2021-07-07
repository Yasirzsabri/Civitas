const express = require('express');
const passport = require('passport');
const User = require('../models/user');

let router = express.Router();

router.post('/login',   
    passport.authenticate('local'),
    (req, res) => {
        res.json(req.user)
    }
);

router.get('/loggedInUser', (req, res) => {
    res.json(req.user)
})

router.get('/logout', function(req, res){
    req.logout();
    res.sendStatus(200);
});
  
module.exports = router;
