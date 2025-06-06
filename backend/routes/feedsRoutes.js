const express =require('express');
// const { addnewevent, getEventsByDepartment, addNewPost, getPostsByDepartment, addDonation, getAllDonations, getSingleDonations, addPostLike, removePostLike, getPostByName } = require('../controllers/feedsController');
const donations = require('../models/donations');
const { addnewevent, getEventsByDepartment } = require('../controllers/eventsController');
const { addNewPost, getPostsByDepartment, getPostByName, addPostLike, removePostLike } = require('../controllers/postsController');
const { addDonation, getAllDonations, getSingleDonations } = require('../controllers/donationsController');
const router=express.Router();

//events
router.post('/addnewevent',addnewevent);
router.get('/getevents/:department', getEventsByDepartment);


//posts
router.post('/addnewpost',addNewPost);
router.get('/getposts/:department',getPostsByDepartment)

router.get('/getpost/:_id',getPostByName);
router.post('/posts/addlike/:_id',addPostLike);
router.post('/posts/removelike/:_id',removePostLike);

//donations
router.post('/adddonations',addDonation);
router.get('/donations',getAllDonations);
router.get('/donation/:id',getSingleDonations);

module.exports=router