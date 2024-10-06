exports.loginController = (req, res) => {
  res.render('pages/login', { pageTitle: 'Login' });
};

exports.logoutController = (req, res) => {
  res.status(200).redirect('/');
};

exports.getRegisterController = (req, res) => {
  res.render('pages/register', { pageTitle: 'Register' });
};

exports.postRegisterController = (req, res) => {
  const registrationInfo = req.body;
  console.log(registrationInfo);
  res.status(200).redirect('/');
}
