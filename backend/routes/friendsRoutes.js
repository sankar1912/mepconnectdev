const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friendsController');
const { verifyToken } = require('../middlewares/authenticate');

router.post('/friends/addfriend', friendsController.addFriend);
router.post('/friends/acceptrequest',friendsController.acceptFriend);
router.post('/friends/removefriend', friendsController.removeFriend);
router.get('/friends/getfriends/:userId', friendsController.getMyFriends);
router.get('/friends/mygroups/:userId', friendsController.getGroups);
router.get('/friends/blockedfriends/:userId', friendsController.getBlockedUsers);
router.get('/friends/getusers',friendsController.getusers);
router.post('/friends/getdetails',verifyToken,friendsController.fetchList);
module.exports = router;