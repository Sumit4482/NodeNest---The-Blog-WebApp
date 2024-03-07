// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Register user route
router.post('/register', UserController.registerUser);
// Login user route
router.post('/login', UserController.loginUser);
module.exports = router;
