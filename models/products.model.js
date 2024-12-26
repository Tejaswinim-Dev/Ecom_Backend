const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum: ['Electronics', 'Jewelry', 'Clothes', 'Accessories', 'Toys', 'Beauty']
    },
    stock:{
        type:Number,
        required:true,
        default:0,
        min:0,
    },
    ratings:{
        type:Number,
        default:0,
        min:0,
        max:5,

    }    
},{timestamps:true});

const productModel=mongoose.model('electronics',productsSchema);

module.exports=productModel;