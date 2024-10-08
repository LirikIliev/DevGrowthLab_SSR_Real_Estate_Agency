const { Router } = require('express');

const {
  homePageController,
  getSearchForOfferController,
  getNotFoundController,
  postSearchForOfferController
} = require('../controllers/mainRotesController');
const {
  getLoginController,
  getRegisterController,
  logoutController,
  postRegisterController,
  postLoginController
} = require('../controllers/authControllers');
const {
  rentHouseController,
  getCreateOfferController,
  postCreateOfferController,
  getPropertyDetailsController,
  getEditDeletePropertyController,
  postEditDeletePropertyController,
  getRentPropertyController
} = require('../controllers/houseControllers');

//* router initialization
const router = Router();
//* main controllers
//!main controllers
router.get('/', homePageController);
router.get('/search-for-offer', getSearchForOfferController);
router.post('/search-for-offer', postSearchForOfferController);
//* Authenticated controllers
//! login/logout
router.get('/login', getLoginController);
router.post('/login', postLoginController)
router.get('/logout', logoutController);
//! registration
router.get('/register', getRegisterController);
router.post('/register', postRegisterController);
//* house controllers
router.get('/rent-property', rentHouseController);
router.get('/create-offer', getCreateOfferController);
router.post('/create-offer', postCreateOfferController);
router.get('/property-details/:propertyId', getPropertyDetailsController)
router.get('/edit-property-offer/:propertyId', getEditDeletePropertyController);
router.post('/edit-property-offer/:propertyId', postEditDeletePropertyController);
router.get('/delete-property-offer/:propertyId', getEditDeletePropertyController);
router.post('/delete-property-offer/:propertyId', postEditDeletePropertyController);
router.get('/rent-property/:propertyId', getRentPropertyController);
//* page not found controller
router.get('/404', getNotFoundController);
router.use('*', getNotFoundController);

module.exports = router;