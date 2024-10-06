const { Schema, model } = require('mongoose');

const { EMAIL_REGEX } = require('../config/config');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (email) {
        return EMAIL_REGEX.test(email);
      }
    }
  },
  password: {
    type: String,
    require: true,
  }
});

module.exports = model('User', userSchema);