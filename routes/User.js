const express = require('express');
const User = require('../models/User');

const router = express.Router();

/**
 * Get route for fetching logged in user information.
 * 
 * @name GET: /users/
 */
router.get('/', (req, res) => {
    res.json(req.user);
});

/**
 * Post route for following a user
 * 
 * @name POST: /users/:userId/follow
 */
router.post('/:userId/follow', (req, res) => {
    //Fetch the object of logged in user
    User.findById(req.user.id)
        .then( loggedInUser => {
            //Fetch the object of user to follow
            User.findById(req.params.userId)
                .then(userToFollow =>{
                    //Add user into followers list
                    loggedInUser.followers.push(userToFollow);
                    loggedInUser
                        .save()
                        .then( _user =>{
                            res.json(_user)
                        })
                        .catch(err => res.json(err))
                })
                .catch(err => res.json({"message": "Invalid user to follow"}));
        })
});

/**
 * Get route for feching list of followers
 * 
 * @name GET: /users/followers
 */
router.get('/followers', (req, res) => {
    User.findById(req.user.id)
        .populate('followers')
        .then(user=> {
            res.json(user)
        })
})

module.exports = router;