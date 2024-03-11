const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const profileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
},

  { timestamps: true }

)

profileSchema.statics.signup = async function(email, password) {
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })
  return user
}

profileSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email not found')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Password is incorrect')
  }

  return user
}

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
