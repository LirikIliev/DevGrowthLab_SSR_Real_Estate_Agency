const { Router } = require('express');
const { homePageController, searchForOfferController } = require('../controllers/mainRotesController');
const { loginController, getRegisterController, logoutController, postRegisterController } = require('../controllers/authControllers');
const { rentHouseController, getCreateOfferController } = require('../controllers/houseControllers');

const router = Router();

//* main controllers
router.get('/', homePageController);
router.get('/search-for-offer', searchForOfferController);

//* Authenticated controllers
//! login/logout
router.get('/login', loginController);
router.get('/logout', logoutController);
//! registration
router.get('/register', getRegisterController);
router.post('/register', postRegisterController);

//* guest controllers
router.get('/rent-house', rentHouseController);
router.get('/create-offer', getCreateOfferController);


module.exports = router;