const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required: true,
        maxLength:32,
        unique:true,
    },
    slug:{
        type:String,
        trim: true,
        unique: true,
        lowercase:true,
    },
  
}, {timestamps:true}

)

module.exports = mongoose.model("Category", categorySchema);