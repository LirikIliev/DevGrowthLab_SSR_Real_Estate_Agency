const { Router } = require('express');
const { homePageController, searchForOfferController } = require('../controllers/mainRotesController');
const { loginController, registerController, logoutController } = require('../controllers/authControllers');
const { rentHouseController, createOfferController } = require('../controllers/houseControllers');

const router = Router();

//* main controllers
router.get('/', homePageController);
router.get('/search-for-offer', searchForOfferController);

//* authenticated controllers
router.get('/login', loginController);
router.get('/logout', logoutController);
router.get('/register', registerController);
router.get('/create-offer');

//* guest controllers
router.get('/rent-house', rentHouseController);
router.get('/create-offer', createOfferController);


module.exports = router;