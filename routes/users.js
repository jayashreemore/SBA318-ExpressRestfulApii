const express = require('express');
const router = express.Router();
let userData = require('../data/users.js');

// GET all users
router.get('/', (req, res) => {
    res.json(userData);
});

// GET a specific user by ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find(user => user.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// POST a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    newUser.id = userData.length + 1;
    userData.push(newUser);
    res.status(201).json(newUser);
});

// PATCH/PUT update user data
router.patch('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    let userIndex = userData.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        userData[userIndex] = { ...userData[userIndex], ...updateUser };
        res.json(userData[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE a user
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    userData = userData.filter(user => user.id !== userId);
    res.sendStatus(204);
});

module.exports = router;
