// controllers/userController.js
const UserServices = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation,loginValidation } = require('../utils/validation');

const UserController = {
  async registerUser(req, res) {
    try {
      // Validate input data
      const { error } = registerValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { username, email, password, fullName } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user with hashed password
      await UserServices.createUser({
        username,
        email,
        password: hashedPassword,
        fullName,
      });
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      let statusCode = 500;
      let message = "Internal server error";

      if (error.message === "User already exists") {
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
        expiresIn: "1h",
      });

      console.log("User logged in successfully:", email);
      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = UserController;
