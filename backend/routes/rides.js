//routing from server.js
const express = require('express')
const Ride = require('../models/rideModel')
const {
  getRides,
  createRide,
  getRide,
  deleteRide,
  updateRide,
  // checkLogin
} = require('../controllers/rideController')

//creates instance of router 
const router = express.Router()

//GET all rides
router.get('/', getRides)

//GET a single rides
router.get('/:id', getRide)

//POST a new rides
router.post('/', createRide)

//DELETE a rides 
router.delete('/:id', deleteRide)

//UPDATE a rides
router.patch('/:id', updateRide)

//POST a login check
// router.post('/check-login', checkLogin)

module.exports = router
