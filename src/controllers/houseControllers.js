exports.rentHouseController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent', isAuth, error: '' });
};

exports.getCreateOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/create', { pageTitle: 'Create Offer', isAuth, error: '' });
};

exports.postCreateOfferController = async (req, res) => {
  try {
    const offerInformation = req.body;
    res.status(200).redirect('/');
  } catch (err) {
    console.error(err);
  }
}