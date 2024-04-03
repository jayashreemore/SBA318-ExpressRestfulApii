
const express = require("express");
const router = express.Router();

const comments = require("../data/comments.js");

// Creating a GET route for the entire comments database.
router.get("/", (req, res) => {
    res.json(comments);
});////////////GET all comments

// Creating a simple GET route for individual comments,
// using a route parameter for the unique id.

// GET comment by ID
router.get("/:id", (req, res) => {
    const comment = comments.find((c) => c.id == req.params.id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// POST create a new comment
router.post("/", (req, res) => {
    const { userId, comment } = req.body;
    const newComment = {
        id: comments.length + 1,
        userId,
        comment
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// PATCH update comment by ID
router.patch("/:id", (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex !== -1) {
        comments[commentIndex] = { ...comments[commentIndex], ...req.body };
        res.json(comments[commentIndex]);
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});

// DELETE delete comment by ID
router.delete("/:id", (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex((c) => c.id == commentId);
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.json({ message: "Comment deleted successfully" });
    } else {
        res.status(404).json({ error: "Comment not found" });
    }
});
module.exports = router;

//////////////////////////
//////////removed this post , patch,delete ...from all routes files for sometime ////////// 
/*

// GET route to get all comments database
router.get('/', (req, res) => {
    res.json(comments);
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


*/

module.exports = router;