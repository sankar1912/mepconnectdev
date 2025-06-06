const mongoose= require('mongoose');
const {Schema}= mongoose;

const transactionSchema= new Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    signature:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:"INR",
    },
    status:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model('Transactions', transactionSchema);