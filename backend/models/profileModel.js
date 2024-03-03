const mongoose = require('mongoose')
// const {
//   createProfile
// } = require('../controllers/profileController')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, 

{timestamps: true}

)

module.exports = mongoose.model('Profile', profileSchema)