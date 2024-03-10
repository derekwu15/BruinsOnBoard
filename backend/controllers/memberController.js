const Member = require('../models/memberModel')
const mongoose = require('mongoose')

const getMembers = async (req, res) => {
    const user_id = req.user._id

    const members = await Member.find({user_id}).sort({createdAt: -1})
    
    res.status(200).json(members)
}

const getMember = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such member'})
    }
  
    const member = await Member.findById(id)
  
    if (!member) {
      return res.status(404).json({error: 'No such member'})
    }
    
    res.status(200).json(Member)
}

const createMember = async (req, res) => {
    const {username, bio} = req.body
  
    let emptyFields = []
  
    if(!username) {
      emptyFields.push('username')
    }
    if(!bio) {
      emptyFields.push('bio')
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const user_id = req.user._id
        const member = await Member.create({username, bio, user_id})

        const responseData = {
            username: member.username,
            bio: member.bio,
            user_id: member.user_id,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt
        }

        res.status(200).json(responseData)
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

const deleteMember = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such member'})
    }
  
    const member = await Member.findOneAndDelete({_id: id})
  
    if (!member) {
      return res.status(400).json({error: 'No such member'})
    }
  
    res.status(200).json(member)
}

const updateMember = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such member'})
    }
  
    const member = await Member.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!member) {
      return res.status(400).json({error: 'No such member'})
    }
  
    res.status(200).json(member)
}

module.exports = {
    getMember,
    getMembers,
    createMember,
    deleteMember,
    updateMember
  }