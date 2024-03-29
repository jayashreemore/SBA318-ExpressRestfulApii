const express = require('express');
const router = express.Router();
let postData = require('../data/posts.js');

// GET all posts
router.get('/', (req, res) => {
    res.json(postData);
});

// GET a specific post by ID
router.get('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = postData.find(post => post.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// POST a new post
router.post('/', (req, res) => {
    const newPost = req.body;
    newPost.id = postData.length + 1;
    postData.push(newPost);
    res.status(201).json(newPost);
});

// PATCH/PUT update post data
router.patch('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const updatePost = req.body;
    let postIndex = postData.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        postData[postIndex] = { ...postData[postIndex], ...updatePost };
        res.json(postData[postIndex]);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// DELETE a post
router.delete('/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    postData = postData.filter(post => post.id !== postId);
    res.sendStatus(204);
});

module.exports = router;
