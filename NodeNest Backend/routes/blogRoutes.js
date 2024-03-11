const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new blog post
router.post('/blogs', authMiddleware, BlogController.createBlog);
// Get a list of all blog posts
router.get('/blogs', authMiddleware,BlogController.getAllBlogs);

router.get('/getblogs/:blogId', authMiddleware,BlogController.getBlogById);
// Update a specific blog post by ID
router.put('/blogs/:blogId', authMiddleware, BlogController.updateBlog);
// Like a specific blog post by ID
router.post('/blogs/:blogId/like', authMiddleware, BlogController.likeBlog);
// Delete a specific blog post by ID
router.delete('/blogs/:blogId', authMiddleware, BlogController.deleteBlog);
// Add a comment to a specific blog post by ID
router.post('/blogs/:blogId/comments', authMiddleware, BlogController.addComment)
// Delete a specific comment on a blog post by ID
router.delete('/blogs/:blogId/comments/:commentId', authMiddleware, BlogController.deleteComment);
// Add a reply to a specific comment on a blog post by ID
router.post('/blogs/:blogId/comments/:commentId/replies', authMiddleware, BlogController.addReply);
// Like or unlike a specific comment on a blog post by ID
router.post('/blogs/:blogId/comments/:commentId/like', authMiddleware, BlogController.likeComment);

module.exports = router; 
