const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male','Female','Transgender'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;