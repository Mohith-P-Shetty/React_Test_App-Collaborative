const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController'); // Import the user controller

// Registration route (POST)
router.post('/register', userController.register);

// Login route (POST)
router.post('/login', userController.login);

module.exports = router;