const express = require("express");
const router = express.Router();
const {loadUser,loginUser,registerUser, logoutUser} =require('../controllers/authController');
const {searchUser,searchUserById} = require("../controllers/searchUsersController");
const activityFinder = require("../controllers/activityController");
const { forgotpassword, resetpassword } = require("../controllers/userController");
const {verifyToken} = require("../middlewares/authenticate");
// Routes
router.post("/register",registerUser); 
router.post("/login", loginUser);   
router.get('/loaduser',loadUser)    
router.get('/logout',logoutUser)
router.get('/user/activity/:email',activityFinder);
router.post('/user/:_id',searchUserById);
router.post('/user/request/resetpassword',forgotpassword);
router.post('/user/request/resetpassword/:token',resetpassword);
// router.get('/user/myprofile', verifyToken);
//searchusers
router.get('/searchpeople',searchUser);
module.exports = router;