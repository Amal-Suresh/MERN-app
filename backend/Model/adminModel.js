const mongoose =require("mongoose")

const Admin =mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        default: true
    },
})

module.exports = mongoose.model("admin",Admin)