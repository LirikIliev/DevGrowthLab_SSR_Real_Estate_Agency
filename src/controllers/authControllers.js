const { registrationService, loginService } = require("../services/authServices");

exports.getLoginController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/login',
    {
      pageTitle: 'Login',
      isAuth,
      values: {},
      error: ''
    });
};

exports.postLoginController = async (req, res, next) => {
  try {
    const user = await loginService(req.body)
    if (!user) res.status(400).redirect('/404');
    res.cookie('isAuth', true);
    res.cookie('user', user);
    res.status(200).redirect('/');
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/login",
      pageTitle: 'Login',
      values: req.body
    };
    next(errObj);
  }
};

exports.logoutController = (req, res) => {
  res.clearCookie('isAuth');
  res.clearCookie('user');
  res.status(200).redirect('/');
};

exports.getRegisterController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/register',
    {
      pageTitle: 'Register',
      isAuth,
      values: {},
      error: ''
    });
};

exports.postRegisterController = async (req, res, next) => {
  try {
    const registrationInfo = req.body;
    await registrationService(registrationInfo);

    res.status(200).redirect('/');
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/register",
      pageTitle: 'Register',
      values: req.body
    };
    next(errObj);
  }
};