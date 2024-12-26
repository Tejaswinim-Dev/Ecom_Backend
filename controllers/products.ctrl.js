const asyncHandler=require('express-async-handler');
const Products=require('../models/products.model');

const productsCtrl={
    create:asyncHandler(async(req,res,next)=>{
        try {
           const products = await Products.create(req.body)
           res.status(201).json({newProducts:products})
        } catch (error) {
            next(error)  
        }
    }),
    getAll:asyncHandler(async(req,res,next)=>{
        try {
            const getAllProducts=await Products.find()
            res.status(200).json({allProducts:getAllProducts})
        } catch (error) {
            next(error)
            
        }
    }),
    updateById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params;
            const updateProducts = await Products.findByIdAndUpdate(id,req.body,{new:true});
            res.status(202).json({updatedProducts : updateProducts});
        } catch (error) {
            next(error)
        }
    }),
    deleteById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params;
            const deleteProducts=await Products.findByIdAndDelete(id)
            if(!deleteProducts){
                res.json({ok:false,message:"User not found"})
            }
            res.status(200).json({ok:true,mesaage:"Product is deleted successfully"})
            
        } catch (error) {
            
        }
    })
}

module.exports=productsCtrl;