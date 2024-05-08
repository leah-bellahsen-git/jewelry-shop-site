const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uniqe:true,
    },
    price:{
        type: Number
    },
    color:{
        type:String
    },
    inventoryStatus:{
        type:String
    },
    url:{
        type:String
    },
    amount:{
        type:Number
    }
},
{
    timestamps :true
})

module.exports = mongoose.model('Product', productSchema)