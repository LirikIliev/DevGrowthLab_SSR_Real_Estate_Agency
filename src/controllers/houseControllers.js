exports.rentHouseController = (req, res) => {
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent' });
};

exports.getCreateOfferController = (req, res) => {
  res.render('pages/create', { pageTitle: 'Create Offer' });
};

exports.postCreateOfferController = (req, res) => {
  const offerInformation = req.body;
  console.log(offerInformation);
  res.status(200).redirect('/');
}