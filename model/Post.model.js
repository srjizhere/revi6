const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    text: { type: String, required: true, },
    image: { type: String },
    createdAt: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        text:String,
        createdAt:Date
    }]
  },
  { timestamps: true }   // createdAt
);

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
};


// {
//   _id: ObjectId,
//   user: { type: ObjectId, ref: 'User' },
//   text: String,
//   image: String,
//   createdAt: Date,
//   likes: [{ type: ObjectId, ref: 'User' }],
//   comments: [{
//     user: { type: ObjectId, ref: 'User' },
//     text: String,
//     createdAt: Date
//   }]
// }