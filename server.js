const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.get('/', (req, res) => {
  res.json({mssg: 'welcome'})
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
