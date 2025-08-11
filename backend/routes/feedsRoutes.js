const express =require('express');
// const { addnewevent, getEventsByDepartment, addNewPost, getPostsByDepartment, addDonation, getAllDonations, getSingleDonations, addPostLike, removePostLike, getPostByName } = require('../controllers/feedsController');
const donations = require('../models/donations');
const { addnewevent, getEventsByDepartment } = require('../controllers/eventsController');
const { addNewPost, getPostsByDepartment, getPostByName, addPostLike, removePostLike } = require('../controllers/postsController');
const { addDonation, getAllDonations, getSingleDonations } = require('../controllers/donationsController');
const router=express.Router();

//events
router.post('/feeds/addnewevent',addnewevent);
router.get('/feeds/getevents/:department', getEventsByDepartment);


//posts
router.post('/feeds/addnewpost',addNewPost);
router.get('/feeds/getposts/:department',getPostsByDepartment)

router.get('/feeds/getpost/:_id',getPostByName);
router.post('/feeds/posts/addlike/:_id',addPostLike);
router.post('/feeds/posts/removelike/:_id',removePostLike);

//donations
router.post('/feeds/adddonations',addDonation);
router.get('/feeds/donations',getAllDonations);
router.get('/feeds/donation/:id',getSingleDonations);

module.exports=router