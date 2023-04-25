const express  = require("express");
const {User}  = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken")

const loginRouter = express.Router()
loginRouter.use(express.json());

loginRouter.post("/",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.find({email});
        const hashed_pass = user[0].password;
        if(user.length){
            bcrypt.compare(password,hashed_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({Userid:user[0]._id},process.env.SECRET);
                    res.send({"msg":"Login Successfull","Access_Token":token})
                }
            })
        }

    }catch(err){

    }

})
loginRouter.get("/getall",async(req,res)=>{
    let alluser = await User.find()
    res.send(alluser)
})
module.exports ={
    loginRouter
}