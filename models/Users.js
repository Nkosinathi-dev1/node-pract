const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
  
    height:{
        type:Number,
        required: true,
    }
    // name:{
    //     type:String,
    //     required:true
    // },

    // ,
    // email:{
    //     type:String,
    //     required:true,
    // }
})

const userModel=mongoose.model("users",UserSchema)
module.exports=userModel;