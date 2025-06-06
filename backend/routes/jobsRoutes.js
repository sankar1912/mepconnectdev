const express = require('express')
const { registerJob, searchJobById, searchJobByUser, searchJobByField } = require('../controllers/jobsController')
const { verifyToken } = require('../middlewares/authenticate')
const { addJobApplication, trackAllJobApplication, trackMyJobs } = require('../controllers/applicationController')

const router = express.Router()

router.route('/job/register').post(verifyToken,registerJob)
router.route('/job/search/:_id').get(searchJobById);
router.route('/job/search/user/:_id').get(verifyToken,searchJobByUser);
router.route('/job/search').get( searchJobByField);

router.route('/job/apply/:_id').post(verifyToken, addJobApplication);
router.route('/job/trackapplication').get( verifyToken, trackAllJobApplication);
router.route('/job/trackmyjobs').get(verifyToken, trackMyJobs)

module.exports= router