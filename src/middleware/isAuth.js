const isAuth = (req, res, next) => {
  const { isAuth } = req.cookies;
  if (!isAuth) return res.redirect('/login');

  next();
};


module.exports = isAuth;