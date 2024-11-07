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

const isAuth = require('../middleware/isAuth');
const isNotAuth = require('../middleware/isNotAuth');

//* router initialization
const router = Router();
//* main controllers
//!main controllers
router.get('/', homePageController);
router.get('/search-for-offer', getSearchForOfferController);
router.post('/search-for-offer', postSearchForOfferController);
//* Authenticated controllers
//! login/logout
router.get('/login', isNotAuth, getLoginController);
router.post('/login', isNotAuth, postLoginController);
router.get('/logout', isAuth, logoutController);
//! registration
router.get('/register', isNotAuth, getRegisterController);
router.post('/register', isNotAuth, postRegisterController);
//* house controllers
router.get('/rent-property', rentHouseController);
router.get('/create-offer', isAuth, getCreateOfferController);
router.post('/create-offer', isAuth, postCreateOfferController);
router.get('/property-details/:propertyId', getPropertyDetailsController)
router.get('/edit-property-offer/:propertyId', isAuth, getEditDeletePropertyController);
router.post('/edit-property-offer/:propertyId', isAuth, postEditDeletePropertyController);
router.get('/delete-property-offer/:propertyId', isAuth, getEditDeletePropertyController);
router.post('/delete-property-offer/:propertyId', isAuth, postEditDeletePropertyController);
router.get('/rent-property/:propertyId', isAuth, getRentPropertyController);
//* page not found controller
router.get('/404', getNotFoundController);
router.use('*', getNotFoundController);

module.exports = router;