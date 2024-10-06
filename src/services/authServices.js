const User = require('../model/user');
const bcrypt = require('bcrypt');

const { keyValueCheck } = require("./helpers");
const { SALT_ROUNDS } = require('../config/config');
const { ERROR_MESSAGES } = require('./config');

exports.registrationService = (registrationData) => {
  const { username, email, password, repeatPassword } = registrationData;
  const hasEmptyField = keyValueCheck(registrationData);
  if (password !== repeatPassword) throw ERROR_MESSAGES.equalityOfPassword
  if (hasEmptyField) throw ERROR_MESSAGES.emptyField;

  return bcrypt.hash(password, SALT_ROUNDS, (err, cryptData) => {
    if (err) throw err;
    const cryptRegistrationData = { username, email, password: cryptData };

    return new User(cryptRegistrationData).save();
  });
};

exports.loginService = async (loginData) => {
  const hasEmptyField = keyValueCheck(loginData);
  if (hasEmptyField) throw ERROR_MESSAGES.emptyField;

  const { email, password } = loginData;
  const user = await User.findOne({ email: email });
  if (!user) throw ERROR_MESSAGES.userNotFound;

  const isAuthenticationCorrect = await bcrypt.compare(password, user.password)
  if (!isAuthenticationCorrect) throw ERROR_MESSAGES.userNotFound;

  return user;
};