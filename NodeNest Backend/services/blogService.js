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
      console.log("Existing ID: ", existingBlog.userId);

      console.log("User id : ", userId);
      if (existingBlog.userId.valueOf() !== userId) {
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
  async likeBlog(blogId, userId) {
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);

      // Check if the user has already liked the blog post
      const userIndex = blog.likes.indexOf(userId);
      if (userIndex === -1) {
        // User hasn't liked the post yet, so add their like
        blog.likes.push(userId);
      } else {
        // User has already liked the post, so remove their like
        blog.likes.splice(userIndex, 1);
      }

      // Save the updated blog post
      await blog.save();

      return blog.likes.length; // Return the count of likes
    } catch (error) {
      console.error("Error liking/unliking blog post:", error);
      throw error;
    }
  },
  async deleteBlog(blogId, userId) {
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);

      // Check if the authenticated user is the owner of the blog post
      if (blog.userId.toString() !== userId) {
        throw new Error("You are not authorized to delete this blog post");
      }

      // Delete the blog post
      await Blog.findByIdAndDelete(blogId);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      throw error;
    }
  },
  async addComment(blogId, userId, content) {
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);

      // Add the comment to the blog post
      blog.comments.push({
        userId,
        content,
        createdAt: new Date(),
      });

      // Increment the comments count
      blog.commentsCount++;

      // Save the updated blog post
      await blog.save();

      // Return the added comment
      return blog.comments[blog.comments.length - 1];
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  async deleteComment(blogId, userId, commentId) {
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);

      // Find the index of the comment in the comments array
      const commentIndex = blog.comments.findIndex(
        (comment) => comment._id.toString() === commentId
      );

      // Check if the authenticated user is the owner of the comment or the owner of the blog post
      if (
        commentIndex !== -1 &&
        (blog.comments[commentIndex].userId.toString() === userId ||
          blog.userId.toString() === userId)
      ) {
        // Remove the comment from the comments array
        blog.comments.splice(commentIndex, 1);

        // Decrement the comments count
        blog.commentsCount--;

        // Save the updated blog post
        await blog.save();
      } else {
        throw new Error("You are not authorized to delete this comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
  async addReply(blogId, commentId, userId, content) {
    try {
      // Find the blog post by ID
      const blog = await Blog.findById(blogId);
  
      // Find the comment in the comments array
      const comment = blog.comments.find(comment => comment._id.toString() === commentId);
  
      // Check if the comment exists
      if (!comment) {
        throw new Error('Comment not found');
      }
  
      // Initialize the replies array if it does not exist
      if (!comment.replies) {
        comment.replies = [];
      }
  
      // Add the reply to the comment
      comment.replies.push({
        userId,
        content,
        createdAt: new Date(),
      });
  
      // Increment the replies count
      comment.repliesCount++;
  
      // Save the updated blog post
      await blog.save();
  
      // Return the added reply
      return comment.replies[comment.replies.length - 1];
    } catch (error) {
      console.error("Error adding reply:", error);
      throw error;
    }
  },
  
  async toggleCommentLike(blogId, commentId, userId) {
    try {
        // Find the blog post by ID
        const blog = await Blog.findById(blogId);

        // Find the comment in the comments array
        const comment = blog.comments.find(comment => comment._id.toString() === commentId);

        // Check if the user has already liked the comment
        const userIndex = comment.likes.indexOf(userId);
        if (userIndex === -1) {
            // User hasn't liked the comment yet, so add their like
            comment.likes.push(userId);
        } else {
            // User has already liked the comment, so remove their like
            comment.likes.splice(userIndex, 1);
        }

        // Update the likes count for the comment
        comment.likesCount = comment.likes.length;

        // Save the updated blog post
        await blog.save();

        // Return the updated likes count for the comment
        return comment.likesCount;
    } catch (error) {
        console.error('Error toggling comment like:', error);
        throw error;
    }
  }
};

module.exports = BlogService;
