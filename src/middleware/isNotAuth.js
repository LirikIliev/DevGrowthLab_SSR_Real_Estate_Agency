const isNotAuth = (req, res, next) => {
  const { isAuth } = req.cookies;
  if (isAuth) return res.redirect('/');

  next();
};

module.exports = isNotAuth;