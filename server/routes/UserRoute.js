const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); // Import the user controller

// Registration route (POST)
router.post('/register', userController.register);

// Login route (POST)
router.post('/login', userController.login);

// New route to get all users (GET)
router.get('/', userController.getAllUsers);

module.exports = router;