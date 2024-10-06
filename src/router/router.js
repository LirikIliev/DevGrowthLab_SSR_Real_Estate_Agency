const { Router } = require('express');

const {
  homePageController,
  searchForOfferController,
  getNotFoundController
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
  postCreateOfferController
} = require('../controllers/houseControllers');

//* router initialization
const router = Router();
//* main controllers
//!main controllers
router.get('/', homePageController);
router.get('/search-for-offer', searchForOfferController);
//* Authenticated controllers
//! login/logout
router.get('/login', getLoginController);
router.post('/login', postLoginController)
router.get('/logout', logoutController);
//! registration
router.get('/register', getRegisterController);
router.post('/register', postRegisterController);
//* house controllers
router.get('/rent-house', rentHouseController);
router.get('/create-offer', getCreateOfferController);
router.post('/create-offer', postCreateOfferController);
//* page not found controller
router.get('/404', getNotFoundController);

module.exports = router;