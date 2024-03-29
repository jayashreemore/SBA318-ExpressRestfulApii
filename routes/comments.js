const express = require('express');
const router = express.Router();

let commentData = require('../data/comments.js');

// GET all comments
router.get('/', (req, res) => {
    res.json(commentData);
});

// GET comments for a specific post
router.get('/post/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const postComments = commentData.filter(comment => comment.postId === postId);
    res.json(postComments);
});

// GET a specific comment by ID
router.get('/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const comment = commentData.find(comment => comment.id === commentId);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// POST a new comment
router.post('/', (req, res) => {
    const newComment = req.body;
    newComment.id = commentData.length + 1;
    commentData.push(newComment);
    res.status(201).json(newComment);
});

// PATCH/PUT update comment data
router.patch('/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const updateComment = req.body;
    let commentIndex = commentData.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
        commentData[commentIndex] = { ...commentData[commentIndex], ...updateComment };
        res.json(commentData[commentIndex]);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

// DELETE a comment
router.delete('/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    commentData = commentData.filter(comment => comment.id !== commentId);
    res.sendStatus(204);
});

module.exports = router;
