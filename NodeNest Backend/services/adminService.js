const User = require('../models/userModel');

const AdminService = {
    async getUserById(userId) {
        try {
            // Retrieve the user by ID from the database
            const user = await User.findById(userId);
            return user;
        } catch (error) {
            console.error('Error retrieving user by ID:', error);
            throw error;
        }
    },
    async deleteUserById(userId) {
        try {
            // Delete the user by ID from the database
            const deletedUser = await User.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            throw error;
        }
    }
};

module.exports = AdminService;
