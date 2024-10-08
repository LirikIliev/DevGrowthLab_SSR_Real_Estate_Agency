const { Schema, default: mongoose } = require("mongoose");
const {
  createPropertyService,
  getPropertyDetailsService,
  updatePropertyDetailsService,
  deletePropertyService,
  getPropertiesService,
  rentPropertyService
} = require("../services/houseServices");

exports.rentHouseController = async (req, res, next) => {
  try {
    const { isAuth } = req.cookies;
    const properties = await getPropertiesService();
    res.render('pages/rent-property', { pageTitle: 'House For Rent', isAuth, error: '', properties });
  } catch (err) {
    next({ errorObject: err });
  }
};

exports.getCreateOfferController = (req, res) => {
  const { isAuth } = req.cookies;

  const page = 'Create';
  res.render('pages/create', {
    pageTitle: page,
    operation: page,
    isAuth,
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
    await createPropertyService(propertyInfo);
    res.status(200).redirect('/');
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/create",
      pageTitle: 'Create Offer',
      operation: 'Create',
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
    const freeSpaces = Number(property.availablePieces) - Number(property.rentedAHouse.length);
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

exports.getEditDeletePropertyController = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { isAuth } = req.cookies;
    const property = await getPropertyDetailsService({ propertyId });
    const isDeletePage = req.path.includes('/delete');
    const page = isDeletePage ? 'Delete' : 'Edit';

    res.render('pages/create', {
      pageTitle: page,
      operation: page,
      isAuth,
      values: property,
      error: ''
    });
  } catch (err) {
    next({ errorObject: err })
  }
};

exports.postEditDeletePropertyController = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const isDeleteOperation = req.path.includes('/delete');
    if (isDeleteOperation) {
      await deletePropertyService(propertyId);
      return res.redirect(`/`);
    }

    await updatePropertyDetailsService({ propertyId, updatedData: req.body });
    res.redirect(`/property-details/${propertyId}`);
  } catch (err) {
    const errObj = {
      errorObject: err,
      path: "pages/create",
      operation: 'Edit',
      pageTitle: 'Edit',
      values: req.body
    };
    next(errObj);
  }
};

exports.getRentPropertyController = async (req, res, next) => {
  try {
    const { user: { _id: userId } } = req.cookies;
    const { propertyId } = req.params;
    await rentPropertyService({ propertyId, userId });
    res.status(200).redirect(`/property-details/${propertyId}`)
  } catch (err) {
    console.log(err)
    next({ errorObject: err });
  }
}
