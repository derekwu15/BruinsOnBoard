const Profile = require('../models/profileModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_KEY,{expiresIn: '3d'} )
}


//get all profiles
const getProfiles = async (req, res) => {
  const profiles = await Profile.find({}).sort({createdAt: -1})

  res.status(200).json(profiles)
}

//get a single profile 

const getProfile = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Profile'})
  }

  const profile = await Profile.findById(id) 
  
  if (!profile) {
    return res.status(404).json({error: "No such profile"})
  }

  res.status(200).json(profile)

}

// create a new profile
const createProfile = async (req, res) => {
  const {email, password} = req.body;
  try {
    const profile = await Profile.signup(email, password)

    const token = createToken(profile._id)

    user = {email, token}
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

//delete a profile 
const deleteProfile = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Profile'})
  }

  const profile = await Profile.findOneandDelete({_id: id})

  if (!profile) {
    return res.status(404).json({error: "No such profile"})
  }

  res.status(200).json(profile)
}

//update a profile 
const updateProfile = async (req,res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Profile'})
  }

  const profile = await Profile.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!profile) {
    return res.status(404).json({error: "No such profile"})
  }

  res.status(200).json(profile)
} 

const checkLogin = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await Profile.login(email, password)

    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error){
    res.status(400).json({error: error.message})
  }
};


//exports functions to be used in routing file under backend/routes
module.exports = {
  getProfiles,
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  checkLogin
}