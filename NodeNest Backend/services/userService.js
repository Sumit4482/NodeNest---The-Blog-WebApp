// services/userServices.js

const User = require("../models/userModel");

const UserServices = {
    async createUser(userData) {
        const { username, email, password, fullName, isAdmin } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const newUser = new User({ username, email, password, fullName, isAdmin });
        await newUser.save();
    },
  async findUserByEmail(email) {
    return await User.findOne({ email });
  },
  async updateProfile(userId, updatedProfileData) {
    try {
      // Find the user document by ID and update it with the new profile data
      const updatedUserProfile = await User.findByIdAndUpdate(
        userId,
        updatedProfileData,
        { new: true }
      );

      if (!updatedUserProfile) {
        throw new Error("User profile not found");
      }

      return updatedUserProfile;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  async deleteProfile(userId) {
    try {
      // Find the user document by ID and delete it
      const deletedUserProfile = await User.findByIdAndDelete(userId);

      if (!deletedUserProfile) {
        throw new Error("User profile not found");
      }

      return deletedUserProfile;
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  },
  async getAllUsers() {
    try {
        // Retrieve all users from the database
        const users = await User.find();
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    }
}
};

module.exports = UserServices;
