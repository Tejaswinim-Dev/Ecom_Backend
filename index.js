const express = require('express');
require('dotenv').config();
const mongoose =require('mongoose');
const cors = require('cors')
const bodyParser=require('body-parser');

const app=express()

//enabling cors for all routes
app.use(cors())
app.use(bodyParser.json())

//endpoint
app.get('/',(req,res)=>{
    res.status(200).json({
        ok:true,
        response:"Welcome to Express App"
    });
});

const userRouter=require('./routes/user.router')
const productsRouter=require('./routes/products.router')

app.use('/api/user',userRouter)
app.use('/api/products',productsRouter)


//server
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on port",PORT)
})

//DB connections
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(()=>{console.log("MongoDB connection is Intialized")}).catch((err)=>{console.log("Counldn't connect to MongoDB",err)});

const db = mongoose.connection;
db.on("error",(err)=>{console.log(err)})
db.once("open",()=>{console.log("Sucessfully Connected to MongoDB")})
