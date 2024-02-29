//Imports
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to NodeNest!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
