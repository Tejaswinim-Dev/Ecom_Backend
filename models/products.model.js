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
        default:4.4,
        min:0,
        max:5,

    }    
},{timestamps:true});

const productModel = mongoose.model('allproducts',productsSchema);

const ElectronicsModel = mongoose.model('electronics',productsSchema,'electronics');
const ClothingModel = mongoose.model('clothing', productsSchema,'clothing');
const JewelryModel = mongoose.model('jewelry', productsSchema,'jewelry');


module.exports = {productModel,ElectronicsModel,ClothingModel,JewelryModel};