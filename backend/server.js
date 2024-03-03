require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const profileRoutes = require('./routes/profiles')
const app = express()

//from alen's server.js
const cors = require('cors');
app.use(cors());
app.use(express.json());

//express app - like a int main() from c++ 


//middle ware 
app.use(express.json())
app.use((req,res, next) => {
  console.log(req.path, req.path)
  next()
})

//routes
app.get('/' , (req, res) => {
  res.json({mssg: 'Welcome'})
})

//connect to db
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port' , process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

//testing route 
app.use('/api/profiles', profileRoutes)

