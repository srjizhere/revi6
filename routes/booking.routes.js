const express = require("express");

const {Booking} = require("../models/booking.model");

const bookingRouter = express.Router()

bookingRouter.use(express.json());

bookingRouter.post('/',(req,res)=>{
    const {user,flight } = req.body;
    try{
        const booking = new Booking({user,flight})
        booking.save();
        res.status(200).send({"msg":`booking confirmed for ${flight} by ${user}`})
    }catch(err){
          res.json({ msg: "Error in booking flight" });
        console.log(err);
    }

})

module.exports = {
    bookingRouter
}