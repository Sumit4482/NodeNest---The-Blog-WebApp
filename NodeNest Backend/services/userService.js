// services/userServices.js

const User = require('../models/userModel');

const UserServices = {
    async createUser(userData) {
        const { username, email, password, fullName } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const newUser = new User({ username, email, password, fullName });
        await newUser.save();
    },
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }
};

module.exports = UserServices;
