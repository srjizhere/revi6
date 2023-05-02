
const express = require("express");
require("dotenv").config();
const { Post } = require("../model/Post.model");

const postRouter = express.Router();
postRouter.use(express.json());


postRouter.get("/",async(req,res)=>{
    let posts  = await  Post.find()
    res.send(posts)
})
postRouter.post('/',async(req,res)=>{
const {text,image} = req.body
let user = req.headers.id;
try{
    let post = new Post({
        user,
        text,
        image,
    })
   await post.save()
    res.send({msg:"posted successfully"})
}catch(err){
    console.log(err);
    res.send({"err":"err"})
}
});
postRouter.patch('/:id',async(req,res)=>{
    let id = req.params.id;
    
    try {
        let post = await Post.findByIdAndUpdate(id,req.body);
        return res.send({msg:"updated"})
    } catch (error) {
        console.log(error);
        res.send({msg:"err"})
    }
})
postRouter.delete('/:id',async(req,res)=>{
    let id = req.params.id;
    try {
        await Post.findByIdAndDelete(id);
        res.send({msg:"Deleted successfully"})
    } catch (error) {
        console.log(error);
        res.send({err:"err"})
    }
})
postRouter.post('/:id/like',async(req,res)=>{
    let id = req.params.id;
    console.log(req.headers);
    let liker  = req.headers.id
    try {
        let post = await Post.findOne({_id:id})
        let postlike = post.likes || [];
        console.log(liker + "suraj")
        if(!postlike.includes(liker)){
            postlike.push(liker)
            await Post.findByIdAndUpdate(id,{likes:postlike})
            res.send({msg:"liked it"})
        }else{
            res.send({msg:"already liked"})
        }
    } catch (error) {
        console.log(error);
        res.send({err:"err"})
    }
})
postRouter.post('/:id/comment',async(req,res)=>{
    let id = req.params.id;
    let commenter  = req.headers.Userid
    let comment = req.body.comment
    let now = Date.now()
    try {
        let post = await Post.findOne({_id:id})
        let postcomments = post.comments || [];
            postcomments.push({user:commenter,text:comment,createdAt:now})
            await Post.findByIdAndUpdate(id,{comments:postcomments})
            res.send({msg:"commented it"})
        
    } catch (error) {
        console.log(error);
        res.send({err:"err"})
    }
})
postRouter.get("/:id",async(req,res)=>{
    let id = req.params.id;
    try{
        let post = await Post.find({_id:id})
        res.send(post)
    }catch(err){
        console.log(err);
        res.send({msg:"err"})
    }
})




module.exports = {
    postRouter
}