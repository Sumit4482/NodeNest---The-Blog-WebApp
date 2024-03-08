const UserService = require('../services/userService');
const bcrypt = require("bcrypt");
const AdminService = require('../services/adminService')

const AdminController = {
    async getAllUsers(req, res) {
        try {
            // Get all users using UserService
            const users = await UserService.getAllUsers();
            res.status(200).json({ users });
        } catch (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async createAdmin(req, res) {
        try {
            // Extract user data from request body
            const { username, email, password,fullName } = req.body;
            
            // Generate hash of the provided password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create admin user data
            const adminData = {
                username,
                email,
                password: hashedPassword,
                fullName,
                isAdmin: true // Mark user as admin
            };

            // Create admin user using UserService
            const adminUser = await UserService.createUser(adminData);

            res.status(201).json({ message: 'Admin user created successfully', user: adminUser });
        } catch (error) {
            console.error('Error creating admin user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async getUserById(req, res) {
      
        try {
            const userId = req.params.userId;

            // Get the user by ID using AdminService
            const user = await AdminService.getUserById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error('Error retrieving user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async deleteUserById(req, res) {
        try {
            const userId = req.params.userId; // Get the ID of the user from the request parameters

            // Delete the user by ID using AdminService
            const deletedUser = await AdminService.deleteUserById(userId);

            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = AdminController;
