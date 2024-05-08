const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    amount:{
        type:Number,
        default:1
    },
    active:{
        type:Boolean,
        default:true
    },
    url:{
        type:String
    },
    productName:{
        type:String
    },
    status:{
         type:String
    },
    userName:{
        type:String
    }


},
{
    timestamps:true
})
module.exports = mongoose.model('order', orderSchema)