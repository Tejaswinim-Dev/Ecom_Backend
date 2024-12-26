const User=require('../models/user.model')

const UserService={
    getByEmail:async(email)=>{
    return await User.findOne({email})
    },
    getByPhone:async(phoneNumber)=>{
        return await User.findOne({phoneNumber})
    }
}

module.exports=UserService;
