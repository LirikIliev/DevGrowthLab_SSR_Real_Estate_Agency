const { errorsDecode } = require("../helpers/helpers");

const errorHandle = (err, req, res, next) => {
  console.log('This is the error comes form error handling', err)
  if (err) {
    const { errorObject = "", path = 'pages/404', pageTitle = "Not found", values = {} } = err;
    const { isAuth } = req.cookies;
    const { message = "There is some problem, please try again later!" } = errorsDecode(errorObject);

    res.status(400).render(path, { pageTitle, isAuth, values, error: message });
  };

  res.status(400).redirect('/404');
};

module.exports = errorHandle