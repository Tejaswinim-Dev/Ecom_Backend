const express = require('express');
const router=express.Router();
const userCtrl=require('../controllers/user.ctrl');

router.post('/create',userCtrl.create);
router.post('/getAll',userCtrl.getAll);//http://localhost:3000/api/user/getuser
router.post('/getById/:id',userCtrl.getById);
router.post('/updateById/:id',userCtrl.updateById);
router.post('/deleteById/:id',userCtrl.deleteById);
router.post('/login', userCtrl.logIn)

module.exports = router;