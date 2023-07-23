const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        required: true,
    },
    email:{
        type:String,
        trim: true,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        trim: true,
        required: true,
        unique: true,
        // min: 4,
        // max: 64,
     },
     address:{
        type:String,
        trim: true,
       
    },
    role:{
        type:Number,
       default:0,
        // min: 4,
        // max: 64,
     }
}, {timestamps:true}

)

module.exports = mongoose.model("User", userSchema);