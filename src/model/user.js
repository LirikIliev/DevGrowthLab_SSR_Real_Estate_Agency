const { Schema, model } = require('mongoose');

const { EMAIL_REGEX } = require('../config/config');

const userSchema = new Schema({
  userName: {
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
        return email.test(EMAIL_REGEX);
      }
    }
  },
  password: {
    type: String,
    require: true,
  }
});

module.exports = model('User', userSchema);