const express = require("express")

const {Booking} = require("../models/booking.model")

const dashRouter = express.Router();

dashRouter.use(express.json());

dashRouter.get('/',async(req,res)=>{
      try {
        const booking = await Booking.find();
        if (booking) {
          res.send({ booking });
        } else {
          res.send({ Err: "not found" });
        }
      } catch (err) {
        res.json({ "err": "err" });
        console.log(err);
      }
})


module.exports = {
    dashRouter
}