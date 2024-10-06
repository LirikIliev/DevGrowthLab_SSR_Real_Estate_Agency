const { registrationService, loginService } = require("../services/authServices");

exports.getLoginController = (req, res) => {
  res.render('pages/login', { pageTitle: 'Login' });
};

exports.postLoginController = async (req, res) => {
  try {
    const user = await loginService(req.body)
    if (!user) res.status(400).redirect('/404');
    res.status(200).redirect('/');
  } catch (err) {
    console.error(err)
  }
};

exports.logoutController = (req, res) => {
  res.status(200).redirect('/');
};

exports.getRegisterController = (req, res) => {
  res.render('pages/register', { pageTitle: 'Register' });
};

exports.postRegisterController = async (req, res) => {
  try {
    const registrationInfo = req.body;
    await registrationService(registrationInfo);
    res.status(200).redirect('/');
  } catch (err) {
    console.error(err);
  }
}
