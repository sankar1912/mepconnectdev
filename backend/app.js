const express=require('express');
const dotenv=require('dotenv');
const path=require('path')
dotenv.config({path:path.join(__dirname,"config/config.env")})
const app=express();
const user=require('./routes/userRoutes');
const friends=require('./routes/friendsRoutes');
const cookieParser=require('cookie-parser');
const feeds=require('./routes/feedsRoutes');
const admin=require('./routes/adminRoutes');
const webhooks= require('./routes/webHookRoutes')
const payments=require('./routes/paymentRoutes');
const job = require('./routes/jobsRoutes');
const fuser = require('./routes/fuserRoutes');
const cors = require("cors")
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: 'XXXXXXXXXXXXXXXXXXXXX',
    credentials: true
}));
app.use('/api/v1',user);
app.use('/api/v1/friends',friends);
app.use('/api/v1/feeds',feeds);
app.use('/api/v1/admin',admin);
app.use('/api/v1',job)
app.use('/api/v1', fuser);
app.use('/api/v1/webhooks',webhooks);

app.use('/api/v1/razorpay',payments);

// app.use(express.static(path.join(__dirname,'../frontend/build')));
//     app.get('*',(req,res)=>
//     {
//         res.sendFile(path.resolve(__dirname,'../frontend/build/index.html'))
//     })
module.exports=app;