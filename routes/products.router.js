const express=require('express');
const router=express.Router();
const productsCtrl=require('../controllers/products.ctrl')

router.post('/create',productsCtrl.create)
router.post('/getAllProducts',productsCtrl.getAll)
router.post('/updateProduct/:id',productsCtrl.updateById)
router.post('/deleteProduct/:id',productsCtrl.deleteById)

module.exports=router;