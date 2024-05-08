
const mongoose = require("mongoose")
// const product = require("./Product")
const userSchema = new mongoose.Schema({
    
    userName:{
        type:String,
        required:true,
        uniqe:true,
        lowercase:true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        minLength:9,
        maxLength:10
    },
    email:{
        type:String
    },
    roles:{
        type:String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address:{
        type:String
    },
    Shoppingbasket:[
                {
                    product_id:{
                        type: Number,
                        ref:"Product",
                        required:true
                    },
                    quantity:{
                        type:Number,
                        required:true
                    }
                }
            ],
            default:[]
        
        // type: [{Number, String}],
        // default:[]
   

},
{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)

