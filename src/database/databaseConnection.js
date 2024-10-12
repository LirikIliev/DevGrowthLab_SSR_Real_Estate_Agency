const { connect } = require('mongoose');

const { DATABASE_URL } = require('../config/config');

exports.databaseConnection = (callback) =>
  connect(DATABASE_URL)
    .then(() => {
      console.log('Database is successfully connected!');
      callback();
    }).catch(err => {
      console.error(err);
    });