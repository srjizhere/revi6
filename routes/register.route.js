const express = require("express");
require("dotenv").config();
const bcrypt = require('bcrypt')
const {User} = require("../models/user.model");

const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.post("/",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        let all_data = await User.find({email});
        if(all_data.length===0){
                 bcrypt.hash(password, 5, async (err, val) => {
                   if (err) {
                     res.send({"msg":"please try later"});
                   } else {
                     const user = new User({ name, email, password: val });
                     await user.save();
                     res.send({"msg":"User Created Successfully"});
                   }
                 });
        }else{
            res.send({"msg":"User Already registered"})
        } 
    }catch(error){
        res.send({"msg":"Error in registering"})
        console.log(error);
    }
});


module.exports = {
    registerRouter
}
