require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes')
const app = express();
const PORT = process.env.PORT || 3000;
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api', blogRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
