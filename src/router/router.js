const { Router } = require('express');
const { homePageController } = require('../controllers/mainRotesController');

const router = Router();

router.get('/', homePageController);


module.exports = router;