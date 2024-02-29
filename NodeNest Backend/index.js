const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to NodeNest!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
