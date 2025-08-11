const express=require('express');
const fetchPermit = require('../controllers/adminPermitController');
const { verifyAdmin } = require('../middlewares/verifyAdmin');
const router=express.Router();

router.use(verifyAdmin)
router.post('/admin/permit',fetchPermit.fetchPermit);
router.post('/admin/verifyuser/success',fetchPermit.updateUserVerified);
router.post('/admin/verifyuser/failure',fetchPermit.updateUserRemoved);

router.post('/admin/verifypost/success',fetchPermit.updatePostVerified);
router.post('/admin/verifypost/failure',fetchPermit.updatePostRemoved);

router.post('/admin/verifyevent/success',fetchPermit.updateEventVerified);
router.post('/admin/verifyevent/failure',fetchPermit.updateEventRemoved);

router.post('/admin/verifydonation/success',fetchPermit.updateDonationVerified);
router.post('/admin/verifydonation/failure',fetchPermit.updateDonationRemoved);

router.route('/admin/verifyjob/success').post(fetchPermit.updateJobVerified);
router.route('/admin/verifyjob/failure').post(fetchPermit.updateJobRemoved);


module.exports= router;