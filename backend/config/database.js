const mongoose=require('mongoose');
const connectDb=()=>{
    mongoose.connect(process.env.LOCAL_MONGO).then(con=>{
        console.log("MongoDB connected to host:"+con.connection.host);
        require("../cron/monthlyFeedsEmail")
    })
}

module.exports=connectDb;