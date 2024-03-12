// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');


// Register user route
router.post('/register', UserController.registerUser);
// Login user route
router.post('/login', UserController.loginUser);
// Retrieve authenticated user's profile
router.get('/profile',authMiddleware, UserController.getAuthenticatedUserProfile);
// Update authenticated user's profile
router.put('/profile', authMiddleware, UserController.updateAuthenticatedUserProfile);
// Delete authenticated user's profile
router.delete('/profile', authMiddleware, UserController.deleteAuthenticatedUserProfile);


module.exports = router;
