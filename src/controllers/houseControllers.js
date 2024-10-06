exports.rentHouseController = (req, res) => {
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent' });
};

exports.createOfferController = (req, res) => {
  res.render('pages/create', { pageTitle: 'Create Offer' });
};

