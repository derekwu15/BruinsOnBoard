const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
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
    min: [0, 'Capacity must be non-negative'], // Non negative capacity is non-negative 
  },
  members: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'Exceeds the limit of 4 members'], // Custom validator for array length
  }
}, { timestamps: true });

//make sure maxiumum length of array is 4 
function arrayLimit(val) {
  return val.length <= 4;
}

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
