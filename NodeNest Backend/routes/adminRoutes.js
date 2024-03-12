const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware')

// Get list of all users (admin only)
router.get('/users', authMiddleware, isAdminMiddleware, AdminController.getAllUsers);
// Create admin user
router.post('/admins', AdminController.createAdmin);
// Get details of a specific user by ID (admin only)
router.get('/getUser/:userId', authMiddleware, isAdminMiddleware, AdminController.getUserById);
router.delete('/users/:userId', authMiddleware, isAdminMiddleware, AdminController.deleteUserById);
module.exports = router;
