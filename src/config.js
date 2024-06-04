const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const Users=new Schema({
    username:{
        type:String,
       
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model("Auth",Users)

module.exports=User;