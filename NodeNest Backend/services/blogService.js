const Blog = require("../models/blogModel");

const BlogService = {
  async createBlog(userId, blogData) {
    try {
      // Create a new blog post document with the provided data
      const newBlog = new Blog({ ...blogData, userId: userId }); // Include userId
      // Save the blog post to the database
      await newBlog.save();
      return newBlog;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  },
  async getAllBlogs() {
    try {
      // Retrieve all blog posts from the database
      const blogs = await Blog.find();
      return blogs;
    } catch (error) {
      console.error("Error retrieving all blog posts:", error);
      throw error;
    }
  },
  async getBlogById(blogId) {
    try {
      // Retrieve the blog post by ID from the database
      const blog = await Blog.findById(blogId);
      return blog;
    } catch (error) {
      console.error("Error retrieving blog post by ID:", error);
      throw error;
    }
  },
  async updateBlog(blogId, userId, updatedData) {
    try {
      // Check if the blog post exists
      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
        throw new Error("Blog post not found");
      }

      // Check if the user is the owner of the blog post
      if (existingBlog.author.toString() !== userId) {
        throw new Error("You are not authorized to update this blog post");
      }

      // Update the blog post with the new data
      existingBlog.set(updatedData);
      const updatedBlog = await existingBlog.save();
      return updatedBlog;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
  },
};

module.exports = BlogService;
