const User=require('../models/user.model')
const asyncHandler=require('express-async-handler')
const UserService=require('../services/user.svc')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userCtrl={
    
    create: asyncHandler(async (req, res, next) => {
        try {
            const { email, phoneNumber ,password} = req.body;
            //existing user display
            const existingUserByEmail = await UserService.getByEmail(email);
            const existingUserByPhone = await UserService.getByPhone(phoneNumber);
    
            if (existingUserByEmail || existingUserByPhone) {
                return res.status(400).json({ message: `User Already exists with this email: ${email} or this phoneNumber: ${phoneNumber}` });
            }

            //password hashing
            const userPassword = password || "Welcome@123"
            const hashedPassword = await bcrypt.hash(userPassword,10);
            req.body.password = hashedPassword;
            

            const user = await User.create(req.body);
            res.status(200).json({ newUser: user });
        } catch (error) {
            next(error);
        }
    }),
    logIn:asyncHandler(async(req,res,next)=>{
        try {
            const{email,password,_id} = req.body;
            const userInfo = await UserService.getByEmail(email);
            if(!userInfo){
                res.status(400).json({message:"User not found with given email ! Enter a valid email or Register"})
            }
            const isPasswordMatched = await bcrypt.compare(req.body.password,userInfo.password);
            if(!isPasswordMatched){
                res.status(400).json({message:"Password is Incorrect"})
            }
            const token=jwt.sign(
                {email:userInfo.email,userId:userInfo._id},
                process.env.JWT_SECRET,
                {expiresIn:"10m"}
            )
            res.status(200).json(
                {message:"Login Successfull",
                data:{
                    email:userInfo.email,
                    token
                }
            })

            
        } catch (error) {
            next(error)
        }
    }),
    getAll:asyncHandler(async(req,res,next)=>{
        try {
           const users= await User.find()
            res.status(200).json({AllUsers:users})
        } catch (error) {
            next(error)
        }
    }),
    getById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params
            const user=await User.findById(id)
            res.status(202).json({user:user})
        } catch (error) {
            next(error)
        }
    }),
    updateById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params
            const updatedUser=await User.findByIdAndUpdate(id,req.body,{new:true})
            res.status(301).json({updatedUser:updatedUser})
        } catch (error) {
            next(error)
        }
    }),
    deleteById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params
            const deletedUser=await User.findByIdAndDelete(id)
            if(!deletedUser){
                res.status(404).json({message:"User not Found"})
                return
            }
            res.status(200).json({message:"User Deleted successfully"})
        } catch (error) {
            next(error)
            
        }
    })
}



module.exports=userCtrl;