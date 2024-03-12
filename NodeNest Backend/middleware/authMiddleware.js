// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config(); // Load environment variables

async function authMiddleware(req, res, next) {
    // Extract token from request headers
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user object to request
        console.log(decoded);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

module.exports = authMiddleware;
