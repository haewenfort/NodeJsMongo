const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();

/**
 * Post route for creating a new message
 * 
 * @name POST: /posts/
 * 
 * @param {string} message - message to post in posts collection
 */
router.post('/', (req, res) => {
    const newPost = new Post({
        message: req.body.message,
        user: req.user
    })
    newPost
        .save()
        .then(post=> res.json (post))
        .catch(err => res.json(err))
});

/**
 * Get rout for fetching logged in user posts
 * 
 * @name GET: /posts/
 */
router.get('/', (req, res) => {
    Post.find({user: req.user})
        .then(posts => res.json(posts))
        .catch(err => res.json(err)) 
});

/**
 * Post route to like a post
 * 
 * @name POST: /posts/:id/like
 * @param {string} id - Id of the post
 */
router.post('/:id/like', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.likes.push(req.user);
            post.save()
                .then(_post=>{
                    res.json({"message": "success"})
                })
        })
})

module.exports = router;