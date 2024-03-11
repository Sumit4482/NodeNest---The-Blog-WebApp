const BlogService = require("../services/blogService");

const BlogController = {
  async createBlog(req, res) {
    try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogData = req.body; // Extract blog data from request body
      const author = req.user.username; // Extract username from authenticated user data
  
      // Set the author field of the blog data to the username of the authenticated user
      blogData.author = author;
  
      // Create the blog post using BlogService
      const newBlog = await BlogService.createBlog(userId, blogData);
  
      // Respond with success message and the newly created blog post
      res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
    } catch (error) {
      // Handle errors
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  async getAllBlogs(req, res) {
    try {
      // Get all blog posts using BlogService
      const blogs = await BlogService.getAllBlogs();
      res.status(200).json({ blogs });
    } catch (error) {
      console.error("Error retrieving all blog posts:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
   async getBlogById(req, res) {
    try {
        const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters

        // Get the blog post by ID using BlogService
        const blog = await BlogService.getBlogById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ blog });
    } catch (error) {
        console.error('Error retrieving blog post by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},
async updateBlog(req, res) {
    try {
        const userId = req.user.id; // Get the ID of the authenticated user
        const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
        const updatedData = req.body; // Extract updated blog data from request body

        // Update the blog post using BlogService
        console.log(blogId);
        const updatedBlog = await BlogService.updateBlog(blogId, userId, updatedData);

        res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},
async likeBlog(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters

      // Like the blog post using BlogService
      const likedBlog = await BlogService.likeBlog(blogId, userId);

      res.status(200).json({ message: 'Blog post liked successfully', blog: likedBlog });
  } catch (error) {
      console.error('Error liking blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
},
async deleteBlog(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters

      // Delete the blog post using BlogService
      await BlogService.deleteBlog(blogId, userId);

      res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
},
async addComment(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
      const { content } = req.body; // Get the content of the comment from the request body

      // Add the comment to the blog post using BlogService
      const comment = await BlogService.addComment(blogId, userId, content);

      res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
},
async deleteComment(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
      const commentId = req.params.commentId; // Get the ID of the comment from the request parameters

      // Delete the comment using BlogService
      await BlogService.deleteComment(blogId, userId, commentId);

      res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
      console.error('Error deleting comment:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
},
async addReply(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
      const commentId = req.params.commentId; // Get the ID of the comment from the request parameters
      const { content } = req.body; // Get the content of the reply from the request body

      // Add the reply to the comment using BlogService
      const reply = await BlogService.addReply(blogId, commentId, userId, content);

      res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (error) {
      console.error('Error adding reply:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
},
async likeComment(req, res) {
  try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
      const commentId = req.params.commentId; // Get the ID of the comment from the request parameters

      // Like or unlike the comment using BlogService
      const likesCount = await BlogService.toggleCommentLike(blogId, commentId, userId);

      res.status(200).json({ message: 'Comment liked/unliked successfully', likesCount });
  } catch (error) {
      console.error('Error liking/unliking comment:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

};

module.exports = BlogController;
