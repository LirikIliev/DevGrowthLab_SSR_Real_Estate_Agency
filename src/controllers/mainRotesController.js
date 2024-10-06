exports.homePageController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/home', { pageTitle: 'Home Page', isAuth, error: '' });
};

exports.searchForOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/search', { pageTitle: 'Search For Offer', isAuth, error: '' });
};

exports.getNotFoundController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/404', { pageTitle: 'Not Found', isAuth, error: '' })
}