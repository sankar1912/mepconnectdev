const express = require('express');
const router = express.Router();
const {getDetails, generateVerificationToken, verifyUserToken} = require('../controllers/fuserController');


router.route('/fuser/get').get(getDetails);
router.route('/fuser/verify').post(generateVerificationToken);
router.route('/fuser/verify/:token').get(verifyUserToken);

module.exports = router;