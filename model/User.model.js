const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    dob: Date,
    bio: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};







// {
//   _id: ObjectId,
//   name: String,
//   email: String,
//   password: String,
//   dob: Date,
//   bio: String,
//   posts: [{ type: ObjectId, ref: 'Post' }],
//   friends: [{ type: ObjectId, ref: 'User' }],
//   friendRequests: [{ type: ObjectId, ref: 'User' }]
// }