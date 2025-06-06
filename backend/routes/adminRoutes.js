const express=require('express');
const fetchPermit = require('../controllers/adminPermitController');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const router=express.Router();

router.use(verifyAdmin)
router.post('/permit',fetchPermit.fetchPermit);
router.post('/verifyuser/success',fetchPermit.updateUserVerified);
router.post('/verifyuser/failure',fetchPermit.updateUserRemoved);

router.post('/verifypost/success',fetchPermit.updatePostVerified);
router.post('/verifypost/failure',fetchPermit.updatePostRemoved);

router.post('/verifyevent/success',fetchPermit.updateEventVerified);
router.post('/verifyevent/failure',fetchPermit.updateEventRemoved);

router.post('/verifydonation/success',fetchPermit.updateDonationVerified);
router.post('/verifydonation/failure',fetchPermit.updateDonationRemoved);

router.route('/verifyjob/success').post(fetchPermit.updateJobVerified);
router.route('/verifyjob/failure').post(fetchPermit.updateJobRemoved);


module.exports= router;