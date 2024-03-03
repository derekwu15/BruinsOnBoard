const mongoose = require('mongoose')
// const {
//   createProfile
// } = require('../controllers/profileController')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  uid: {
    type: Number,
    required: true
  }
}, 

{timestamps: true}

)

module.exports = mongoose.model('Profile', profileSchema)