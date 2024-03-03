const express = require('express');
const app = express();
const port = 3000;

const connectToMongoDB = require('./database/db');

app.use(express.json());
// Define a route to handle POST requests
app.post('/upload', async (req, res) => {
  const { name, email } = req.body;

  try {
      // Connect to MongoDB Atlas
      const db = await connectToMongoDB();

      // Access the collection (assuming it's named 'users')
      const collection = db.collection('Profiles');

      // Insert the received data into the collection
      await collection.insertOne({ name, email });
      
      // Respond with a success message
      res.status(200).json({ message: 'Data uploaded to MongoDB Atlas' });
  } catch (error) {
      // Handle errors
      console.error('Error uploading data:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.json({mssg: 'welcome'})
})

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});