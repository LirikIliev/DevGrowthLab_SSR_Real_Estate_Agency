exports.loginController = (req, res) => {
  res.render('pages/login', { pageTitle: 'Login' });
};

exports.registerController = (req, res) => {
  res.render('pages/register', { pageTitle: 'Register' });
};

exports.logoutController = (req, res) => {
  res.status(200).redirect('/');
};