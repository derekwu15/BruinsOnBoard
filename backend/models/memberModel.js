const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
  username: {
    type: String
  },
  name: {
    type: String,
  },
  bio: {
    type: String,
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Member', memberSchema)