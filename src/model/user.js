const { Schema, model } = require('mongoose');

const { EMAIL_REGEX } = require('../config/config');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required to create registration!'],
    minLength: [3, 'username must be at least 3 character long!'],
    maxLength: [10, 'username must be at least 10 character long!']
  },
  email: {
    type: String,
    require: [true, 'Email is required to create registration!'],
    unique: true,
    validate: {
      validator: function (email) {
        return EMAIL_REGEX.test(email);
      },
    },
    message: "The email address is already taken!"
  },
  password: {
    type: String,
    require: [true, 'Password is required to create registration!'],
    minLength: [6, 'Password must be at least 6 symbols long!'],
  }
});

module.exports = model('User', userSchema);