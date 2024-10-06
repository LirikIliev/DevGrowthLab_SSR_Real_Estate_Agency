const { errorsDecode } = require("../helpers/helpers");

const errorHandle = (err, req, res, next) => {
  if (err) {
    const error = errorsDecode(err);
    res.status(400).redirect('/404')
  };

  next();
};

module.exports = errorHandle