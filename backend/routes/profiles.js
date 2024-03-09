//routing from server.js
const express = require('express')
const Profile = require('../models/profileModel')
const {
  getProfiles,
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  checkLogin
} = require('../controllers/profileController')

//creates instance of router 
const router = express.Router()

//GET all profiles
router.get('/', getProfiles)

//GET a single profile
router.get('/:id', getProfile)

//POST a new profile
router.post('/', createProfile)

//DELETE a profile 
router.delete('/:id', deleteProfile)

//UPDATE a profile
router.patch('/:id', updateProfile)

//POST a login check
router.post('/check-login', checkLogin)

module.exports = router