const jwt = require('jsonwebtoken')
const Profile = require('../models/profileModel')

const requireAuth = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in.' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, 'aserasetaseljashfla;sejrtlasf')

    req.user = await Profile.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'You must be logged in.' })
  }
};

module.exports = requireAuth;
