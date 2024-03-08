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


module.exports = router;
