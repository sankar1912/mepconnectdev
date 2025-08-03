const mongoose=require('mongoose');
const connectDb=()=>{
    mongoose.connect(process.env.MONGO_DB_URI).then(con=>{
        console.log("MongoDB connected to host:"+con.connection.host);
        require("../cron/monthlyFeedsEmail")
    })
}

module.exports=connectDb;