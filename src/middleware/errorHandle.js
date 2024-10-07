const { errorsDecode } = require("../helpers/helpers");

const errorHandle = (err, req, res, next) => {
  if (err) {
    const { errorObject = "", path = 'pages/404', pageTitle = "Not found", values = {}, ...rest } = err;
    const { isAuth } = req.cookies;
    const { message = "There is some problem, please try again later!" } = errorsDecode(errorObject);

    res.status(400).render(path, { pageTitle, isAuth, values, ...rest, error: message });
  };

  res.status(400).redirect('/404');
};

module.exports = errorHandle;