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
const requireAuth = require('../middleware/requireAuth')
//creates instance of router 
const router = express.Router()

//POST a new profile
router.post('/', createProfile)

//POST a login check
router.post('/login', checkLogin)


//middleware to check if user is logged in
router.use(requireAuth)

//GET all profiles
router.get('/', getProfiles)

//GET a single profile
router.get('/:id', getProfile)

//DELETE a profile 
router.delete('/:id', deleteProfile)

//UPDATE a profile
router.patch('/:id', updateProfile)



module.exports = router