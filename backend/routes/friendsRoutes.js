const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const { verifyToken } = require('../middlewares/authenticate');

router.post('/addfriend', friendsController.addFriend);
router.post('/acceptrequest',friendsController.acceptFriend);
router.post('/removefriend', friendsController.removeFriend);
router.get('/getfriends/:userId', friendsController.getMyFriends);
router.get('/mygroups/:userId', friendsController.getGroups);
router.get('/blockedfriends/:userId', friendsController.getBlockedUsers);
router.get('/getusers',friendsController.getusers);
router.post('/getdetails',verifyToken,friendsController.fetchList);
module.exports = router;