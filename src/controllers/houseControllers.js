exports.rentHouseController = (req, res) => {
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent' });
};

exports.getCreateOfferController = (req, res) => {
  res.render('pages/create', { pageTitle: 'Create Offer' });
};

exports.postCreateOfferController = async (req, res) => {
  try {
    const offerInformation = req.body;
    res.status(200).redirect('/');
  } catch (err) {
    console.error(err);
  }
}