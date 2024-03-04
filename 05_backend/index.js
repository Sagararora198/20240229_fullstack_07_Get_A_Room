const express = require('express')
const app = express()
const mongoose = require("mongoose")
const {MONGOURI} = require('./keys')
require('./models/userModel')
require('./models/post')
require('dotenv').config()
const { route } = require('./routes/auth')



mongoose.connect(MONGOURI)
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo");
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err);
})


app.use(express.json())
app.use(require('./routes/auth'))


app.use(require('./routes/post'))



app.listen(5000,()=>{
    console.log("server is runnig on",5000);
})