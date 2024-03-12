const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Content of the comment
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID of the user who made the comment
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true }, // ID of the blog post the comment belongs to
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // ID of the parent comment, if any (for nested comments)
    createdAt: { type: Date, default: Date.now }, // Timestamp of when the comment was created
    updatedAt: { type: Date, default: Date.now }, // Timestamp of when the comment was last updated
    likesCount: { type: Number, default: 0 }, // Count of likes on the comment
    edited: { type: Boolean, default: false }, // Flag indicating if the comment has been edited
    editedAt: Date, // Timestamp of when the comment was last edited
    reported: { type: Boolean, default: false }, // Flag indicating if the comment has been reported
    reportCount: { type: Number, default: 0 }, // Count of reports on the comment
    replies: [{
        content: { type: String, required: true }, // Content of the reply
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID of the user who made the reply
        createdAt: { type: Date, default: Date.now }, // Timestamp of when the reply was created
        updatedAt: { type: Date, default: Date.now }, // Timestamp of when the reply was last updated
        edited: { type: Boolean, default: false }, // Flag indicating if the reply has been edited
        editedAt: Date // Timestamp of when the reply was last edited
    }]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
