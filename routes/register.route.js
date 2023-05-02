const express = require("express");
require("dotenv").config();
const bcrypt  = require("bcrypt")
const jwt = require('jsonwebtoken');
const { User } = require("../model/User.model");


const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.post("/", async (req, res) => {
    console.log("hey" );
  const { name, email, password, dob } = req.body;
  try {
    let all_data = await User.find({ email });
    if (all_data.length === 0) {
      bcrypt.hash(password, 5, async (err, val) => {
        if (err) {
          res.send({ msg: "please try later" });
        } else {
          const user = new User({
            name,
            email,
            password: val,
            dob,
          });
          await user.save();
          res.send({ msg: `User ${name, email} Created Successfully` });
        }
      });
    } else {
      res.send({ msg: "User Already registered" });
    }
  } catch (error) {
    res.send({ msg: "Error in registering" });
    console.log(error);
  }
});
registerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    const hashed_pass = user[0].password;
    if (user.length) {
      bcrypt.compare(password, hashed_pass, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ Userid: user[0]._id }, process.env.SECRET);
          res.send({ msg: "Login Successfull", Access_Token: token });
        } else {
          res.send({ msg: "wrong credentials" });
        }
      });
    } else {
      res.send({ msg: "user does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Error in login" });
  }
});


module.exports = {
    registerRouter,
}