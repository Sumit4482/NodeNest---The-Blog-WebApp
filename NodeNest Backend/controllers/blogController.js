const BlogService = require("../services/blogService");

const BlogController = {
  async createBlog(req, res) {
    try {
      const userId = req.user.id; // Get the ID of the authenticated user
      const blogData = req.body; // Extract blog data from request body

      // Create the blog post using BlogService
      const newBlog = await BlogService.createBlog(userId, blogData);

      res
        .status(201)
        .json({ message: "Blog post created successfully", blog: newBlog });
    } catch (error) {
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
}   ,

async updateBlog(req, res) {
    try {
        const userId = req.user.id; // Get the ID of the authenticated user
        const blogId = req.params.blogId; // Get the ID of the blog post from the request parameters
        const updatedData = req.body; // Extract updated blog data from request body

        // Update the blog post using BlogService
        const updatedBlog = await BlogService.updateBlog(blogId, userId, updatedData);

        res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
};

module.exports = BlogController;
