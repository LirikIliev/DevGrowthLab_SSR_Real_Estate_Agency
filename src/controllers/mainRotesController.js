exports.homePageController = (req, res) => {
  res.render('pages/home', { pageTitle: 'Home Page' });
};

exports.searchForOfferController = (req, res) => {
  res.render('pages/search', { pageTitle: 'Search For Offer' });
};

