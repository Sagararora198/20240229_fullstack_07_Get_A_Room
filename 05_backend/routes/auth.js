const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
const requireLogin = require('../middleware/requireLogin')







router.post('/signup',(req,res)=>{
    const {name,EnrollmentNo,email,password} = req.body
    if(!name||!EnrollmentNo||!email||!password){
        return res.status(422).json({error:"please add all feilds"})
    }
    User.findOne({EnrollmentNo:EnrollmentNo})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exist"})
        }
        const user = new User({
            name,
            email,
            EnrollmentNo,
            password
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })

})

router.post('/signin',(req,res)=>{
    const {password,EnrollmentNo} = req.body
    if(!password||!EnrollmentNo){
        res.status(422).json({error:"please enter all fields"})

    }
    User.findOne({EnrollmentNo:EnrollmentNo})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid user"})
        }
        if(password==savedUser.password){
            // res.json({message:"successfully"})
            
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            const {_id,name,EnrollmentNo} = savedUser
            res.json({token,user:{_id,name,EnrollmentNo}})
        }
        else{
            return res.status(422).json({error:"invalid user"})
        }
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get("/protected",requireLogin,(req,res)=>{
    res.send("hello")
})
module.exports = router