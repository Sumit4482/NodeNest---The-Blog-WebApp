const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    profilePicture: { type: String }, // Make profilePicture optional
    bio: { type: String }, // Make bio optional
    socialMedia: {
        twitter: String,
        linkedIn: String
    },
    lastLogin: Date,
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    interests: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
