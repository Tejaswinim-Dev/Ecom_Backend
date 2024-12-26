const asyncHandler=require('express-async-handler');
const {productModel,ElectronicsModel,ClothingModel,JewelryModel}=require('../models/products.model');

const productsCtrl={
    create:asyncHandler(async(req,res,next)=>{
        try {
           const products = await productModel.create(req.body)
           res.status(201).json({newProducts:products})
        } catch (error) {
            next(error)  
        }
    }),
    getAll:asyncHandler(async(req,res,next)=>{
        try {
            const getAllProducts=await productModel.find()
            res.status(200).json({allProducts:getAllProducts})
        } catch (error) {
            next(error)
            
        }
    }),
    getProductsByCategory:asyncHandler(async(req,res,next)=>{
       try {
        const {category} = req.params;
        let products;

            // Use appropriate model based on category
            switch (category) {
                case 'electronics':
                    products = await ElectronicsModel.find();
                    break;
                case 'clothing':
                    products = await ClothingModel.find();
                    break;
                case 'jewelry':
                    products = await JewelryModel.find();
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid category' });
            }
            res.status(200).json(products);
       } catch (error) {
            next(error)
       }


    }),
    updateById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params;
            const updateProducts = await productModel.findByIdAndUpdate(id,req.body,{new:true});
            res.status(202).json({updatedProducts : updateProducts});
        } catch (error) {
            next(error)
        }
    }),
    deleteById:asyncHandler(async(req,res,next)=>{
        try {
            const {id}=req.params;
            const deleteProducts=await productModel.findByIdAndDelete(id)
            if(!deleteProducts){
                res.json({ok:false,message:"User not found"})
            }
            res.status(200).json({ok:true,mesaage:"Product is deleted successfully"})
            
        } catch (error) {
            
        }
    })
}

module.exports=productsCtrl;