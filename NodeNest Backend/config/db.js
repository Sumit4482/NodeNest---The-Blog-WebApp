const mongoose = require('mongoose');



/**
 * Connect to MongoDB database using Mongoose.
 * 
 * @async
 * @returns {Promise<void>} A Promise that resolves when the database connection is established successfully.
 * @throws {Error} If there is an error connecting to the MongoDB database.
 */
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Sumit:room101@cluster0.ptlzfdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};



module.exports = connectDB;
