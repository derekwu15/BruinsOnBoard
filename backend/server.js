require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const profileRoutes = require('./routes/profiles')
const memberRoutes = require('./routes/members')
const rideRoutes = require('./routes/rides')
const sendEmail = require('./controllers/sendEmail')

const app = express()

//from alen's server.js
const cors = require('cors');
app.use(cors());
app.use(express.json());

//express app - like a int main() from c++

//testing with local uri
const uri = process.env.MONGO_URI

//middle ware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.path)
  next()
})

//routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome' })
})

//connect to db
mongoose.connect(uri)
  .then(() => {
    //listen for requests
    app.listen(4000, () => {
      console.log('connected to db & listening on port', 4000)
    })
  })
  .catch((error) => {
    console.log(error)
  })

// Send email
app.post('/api/sendEmail', async (req, res) => {
  const { email, title, start, end, displayName } = req.body;

  try {
    await sendEmail({ email, title, start, end, displayName }); // Call the sendEmail function with the recipient email address
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

//testing route
app.use('/api/profiles', profileRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/rides', rideRoutes)
