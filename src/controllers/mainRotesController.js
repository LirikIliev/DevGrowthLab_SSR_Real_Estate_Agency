const { sortedPropertiesService } = require("../services/houseServices");

exports.homePageController = async (req, res) => {
  try {
    const { isAuth } = req.cookies;
    const properties = await sortedPropertiesService({ limit: 3 });
    res.render('pages/home', { pageTitle: 'Home Page', isAuth, properties, error: '' });
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/home",
      pageTitle: 'Home Page',
    };
    next(errObj);
  }
};

exports.searchForOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/search', { pageTitle: 'Search For Offer', isAuth, error: '' });
};

exports.getNotFoundController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/404', { pageTitle: 'Not Found', isAuth, error: '' })
};