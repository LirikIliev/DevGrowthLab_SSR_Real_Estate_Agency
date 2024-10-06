const { createHouseService } = require("../services/houseServices");

exports.rentHouseController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent', isAuth, error: '' });
};

exports.getCreateOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/create', { pageTitle: 'Create Offer', isAuth, values: {}, error: '' });
};

exports.postCreateOfferController = async (req, res, next) => {
  try {
    await createHouseService(req.body);
    res.status(200).redirect('/');
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/create",
      pageTitle: 'Create Offer',
      values: req.body
    };
    next(errObj);
  }
}