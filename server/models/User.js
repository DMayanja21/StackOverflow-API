// Call mongoose
const mongoose = require('mongoose');

// Call Schema constructor
const { Schema } = mongoose;

// Library for hashing passwords (encryption)
const crypto = require('crypto');

// Creating a user schema
const userSchema = new Schema({
  // user_id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  user_salt: {
    type: String,
    required: true,
  },
  user_hash: {
    type: String,
    required: true,
  },
});

// Password Encryption
userSchema.methods.setPassword = function (password) {
  this.user_salt = crypto.randomBytes(16).toString('hex');

  this.user_hash = crypto
    .pbkdf2Sync(password, this.user_salt, 1000, 64, 'sha512')
    .toString('hex');
  // console.log("The user hash", this.user_hash)
};

// Login password validation
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.user_salt, 1000, 64, 'sha512')
    .toString('hex');

  // Returns either true or false depending on if the password matches the hashed value stored
  return this.user_hash === hash;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
