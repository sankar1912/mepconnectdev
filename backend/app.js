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
const cors = require("cors");
const decodeAuth = require('./middlewares/decodeAuth');

const middleware = require("./middlewares/error")
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: 'XXXXXXXXXXXXXXXXXXXXX',
    credentials: true
}));
app.use(decodeAuth);
app.use('/api/v1',user);
app.use('/api/v1',friends);
app.use('/api/v1',feeds);
app.use('/api/v1',admin);
app.use('/api/v1',job)
app.use('/api/v1', fuser);
app.use('/api/v1',webhooks);
app.use('/api/v1',payments);

app.use(express.static(path.join(__dirname,'../frontend/dist')));
    app.get('*',(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
app.use(middleware)
module.exports=app;