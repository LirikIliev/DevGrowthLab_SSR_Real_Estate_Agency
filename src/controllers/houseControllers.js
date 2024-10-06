const { createHouseService, getPropertyDetailsService } = require("../services/houseServices");

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
    const { user: { _id } } = req.cookies;
    const propertyInfo = {
      ...req.body,
      owner: _id,
    };
    await createHouseService(propertyInfo);
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
};

exports.getPropertyDetailsController = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { isAuth } = req.cookies;
    const { user: { _id } = {} } = req.cookies;
    const property = await getPropertyDetailsService(propertyId);
    const isOwner = isAuth && _id ? _id.toString() === property.owner._id.toString() : false;
    const freeSpaces = Number(property.availablePieces) - Number(property.rentedAHouse.length)
    const hasFreeSpaces = freeSpaces > 0;
    const hasUserBooked = property.rentedAHouse.some(userId => userId.toString() === _id.toString());

    res.render('pages/details',
      {
        pageTitle: 'Details',
        isAuth,
        values: property,
        isOwner,
        freeSpaces,
        hasFreeSpaces,
        hasUserBooked,
        error: ''
      });
  } catch (err) {
    const errObj = {
      errorObject: err,
    };
    next(errObj);
  }
}