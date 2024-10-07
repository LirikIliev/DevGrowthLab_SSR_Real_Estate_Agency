const { createHouseService, getPropertyDetailsService, updatePropertyDetailsService } = require("../services/houseServices");

exports.rentHouseController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/aprt-for-rent', { pageTitle: 'House For Rent', isAuth, error: '' });
};

exports.getCreateOfferController = (req, res) => {
  const { isAuth } = req.cookies;
  res.render('pages/create', {
    pageTitle: 'Create Offer',
    isAuth,
    create: true,
    values: {},
    error: ''
  });
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
      create: true,
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
    const property = await getPropertyDetailsService({ propertyId, populateRow: ['owner'] });
    const isOwner = isAuth && _id ? _id.toString() === property.owner._id.toString() : false;
    const freeSpaces = Number(property.availablePieces) - Number(property.rentedAHouse.length)
    const hasFreeSpaces = freeSpaces > 0;
    const hasUserBooked = property.rentedAHouse.some(userId => userId.toString() === _id.toString());
    const tenants = property.rentedAHouse
      .map(tenant => tenant.name)
      .join(', ');

    res.render('pages/details',
      {
        pageTitle: 'Details',
        isAuth,
        values: property,
        isOwner,
        freeSpaces,
        tenants,
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
};

exports.getEditPropertyOfferController = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { isAuth } = req.cookies;
    const property = await getPropertyDetailsService({ propertyId });
    res.render('pages/create', {
      pageTitle: 'Edit',
      create: false,
      isAuth,
      values: property,
      error: ''
    });
  } catch (err) {
    next({ errorObject: err })
  }
};

exports.postEditPropertyController = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    await updatePropertyDetailsService({ propertyId, updatedData: req.body });

    res.redirect(`/edit-property-offer/${propertyId}`);
  } catch (err) {
    console.log(err)
    const errObj = {
      errorObject: err,
      path: "pages/create",
      create: false,
      pageTitle: 'Edit',
      values: req.body
    };
    next(errObj);
  }
}