const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likesCount: { type: Number, default: 0 },
    edited: { type: Boolean, default: false },
    editedAt: Date,
    reported: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
