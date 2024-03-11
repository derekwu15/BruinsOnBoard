const Ride = require('../models/rideModel')
const mongoose = require('mongoose')

//get all rides
const getRides = async (req, res) => {
  const rides = await Ride.find({}).sort({ createdAt: -1 })

  res.status(200).json(rides)
}

//get a single ride

const getRide = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Ride' })
  }

  const ride = await Ride.findById(id)

  if (!ride) {
    return res.status(404).json({ error: "No such ride" })
  }

  res.status(200).json(ride)

}

//create a new ride
const createRide = async (req, res) => {
  const { to, from, date, time, capacity, members } = req.body;

  try {
    const ride = await Ride.create({ to, from, date, time, capacity, members });
    res.status(200).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a ride
const deleteRide = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Ride' })
  }

  const ride = await Ride.findOneandDelete({ _id: id })

  if (!ride) {
    return res.status(404).json({ error: "No such ride" })
  }

  res.status(200).json(ride)
}

//update a ride
const updateRide = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Ride' })
  }

  const ride = await Ride.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!ride) {
    return res.status(404).json({ error: "No such ride" })
  }

  res.status(200).json(ride)
}

//exports functions to be used in routing file under backend/routes
module.exports = {
  getRides,
  createRide,
  getRide,
  deleteRide,
  updateRide
}
