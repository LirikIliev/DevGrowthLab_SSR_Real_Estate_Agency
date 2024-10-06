const errorHandle = (err, req, res, next) => {
  if (err) {
    //! to create a logic who will extract error messages!
    console.log('This is the error : ', err);
    res.status(400).redirect('/404')
  };

  next();
};

module.exports = errorHandle