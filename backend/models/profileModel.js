const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, 

{timestamps: true}

)

// Pre-save hook to hash password
profileSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Method to compare passwords
profileSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
