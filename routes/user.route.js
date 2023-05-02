const express = require("express");
require("dotenv").config();

const { User } = require("../model/User.model");


const userRouter = express.Router();
userRouter.use(express.json())

userRouter.get("/",async(req,res)=>{
    try{
        const users = await User.find()
        res.send(users)

    }catch(err){
        res.send({"msg":"err"})
        console.log(err);
    }
})

userRouter.get("/:id/friends",async(req,res)=>{
    try{
        let  user = await User.find(req.params.id)
        let friends = user.friends 
        res.send(friends)
    }catch(err){
        res.send({msg:"err"})
        console.log(err);
    }
})
userRouter.post("/:id/friends",async(req,res)=>{
    let sender = req.headers.id
    try{
        let  user = await User.findOne({_id:req.params.id})
        let arr = user.friendRequests || [];
        arr.push(sender)
        let sending = await User.findByIdAndUpdate(user._id, {
          friendRequests: arr
        });
        return res.send({"msg":"sucessfully sent request"})
    }catch(err){
        res.send({msg:err.stack})
        console.log(err);
    }
})
userRouter.patch("/:id/friends/:friendId",async(req,res)=>{
    let self = req.params.id;
    let applicant = req.params.friendId
    try{
        let user  = await User.findOne({_id:self});
        if(user){
            let allreq = user.friendRequests;
           let newlist =  allreq.filter((e)=>{
            e!== applicant
           }
           )
           let friendlist = user.friends || []
           friendlist.push(applicant)
           let acc = await User.findByIdAndUpdate(self,{
            friends:friendlist,
            friendRequests:newlist
           })
           res.send({msg:"Accepted sucessfully"})
        }
    }catch(err){
        res.send({"err":"err"})
        console.log(err);
    }


});







module.exports={
    userRouter,
}