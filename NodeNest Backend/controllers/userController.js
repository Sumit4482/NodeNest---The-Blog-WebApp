// controllers/userController.js
const UserServices = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../utils/validation");
const User = require("../models/userModel");

const UserController = {
  async registerUser(req, res) {
    try {
      console.log('Received registration request:', req.body);
      // Validate input data
      const { error } = registerValidation.validate(req.body);
      if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
      }
  
      // Destructure req.body with default values of null for non-required fields
      const { username, email, password, fullName, profilePicture = null, bio = null, socialMedia = null, lastLogin = null, status = null, interests = null, isAdmin = null } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed:', hashedPassword);
  
      // Create user with hashed password
      await UserServices.createUser({
        username,
        email,
        password: hashedPassword,
        fullName,
        profilePicture,
        bio,
        socialMedia,
        lastLogin,
        status,
        interests,
        isAdmin
      });
      console.log('User created successfully');
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      let statusCode = 500;
      let message = "Internal server error";
  
      if (error.message === "User already exists") {
        console.log('User already exists');
        statusCode = 400;
        message = "User already exists";
      }
  
      res.status(statusCode).json({ message });
    }
  },
  
  async loginUser(req, res) {
    try {
      const { error } = loginValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { email, password } = req.body;
      console.log("Login request received for email:", email);

      // Check if user exists
      const user = await UserServices.findUserByEmail(email);
      if (!user) {
        console.log("User not found:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid password for user:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      console.log("User logged in successfully:", email);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAuthenticatedUserProfile(req, res) {
    try {
      // Retrieve authenticated user's profile based on req.user (assuming user information is stored in req.user after authentication)
      const userProfile = await User.findById(req.user.id);
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }
      res.status(200).json({ userProfile });
    } catch (error) {
      console.error("Error retrieving user profile:", error);
      // Log the entire error object for debugging purposes
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  async updateAuthenticatedUserProfile(req, res) {
    try {
      const userId = req.user.id;
      const updatedProfileData = req.body;

      // Update user profile using UserService
      const updatedUserProfile = await UserServices.updateProfile(
        userId,
        updatedProfileData
      );

      res.status(200).json({ userProfile: updatedUserProfile });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal server error";

      if (error.message === "User profile not found") {
        statusCode = 404;
        message = "User profile not found";
      }

      console.error("Error updating user profile:", error);
      res.status(statusCode).json({ message });
    }
  },
  async deleteAuthenticatedUserProfile(req, res) {
    try {
      const userId = req.user.id;

      // Delete user profile using UserService
      const deletedUserProfile = await UserServices.deleteProfile(userId);

      res.status(204).json({ message: "User profile deleted successfully" });
    } catch (error) {
      let statusCode = 500;
      let message = "Internal server error";

      if (error.message === "User profile not found") {
        statusCode = 404;
        message = "User profile not found";
      }

      console.error("Error deleting user profile:", error);
      res.status(statusCode).json({ message });
    }
  },
};

module.exports = UserController;
