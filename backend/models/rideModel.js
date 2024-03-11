const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  members: {
    type: [String],
    required: true
  }
},

  { timestamps: true }

)

const Ride = mongoose.model('Ride', profileSchema);

module.exports = Ride;
