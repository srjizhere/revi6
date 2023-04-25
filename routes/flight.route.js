const express = require("express");

const { Flight } = require("../models/flight.model");

const flighttRouter = express.Router();
flighttRouter.use(express.json());

flighttRouter.get("/", async (req, res) => {
    console.log(req.query);
  try {
    const flight = await Flight.find(req.query);
    if (flight) {
      res.send({ flight });
    } else {
      res.send({ Err: "not found" });
    }
  } catch (err) {
    res.json({ err: err });
    console.log(err);
  }
});

flighttRouter.post("/", async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;
  try {
    const flight = new Flight({
      airline,
      flightNo,
      departure,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    flight.save();
    res.json({ msg: "Flight Created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error in creating flights" });
  }
});

flighttRouter.patch('/',async(req,res)=>{
    console.log(req.params);
    const id = req.query.id
 const payload = req.body;
 try {
    const flight = await Flight.findByIdAndUpdate(id,payload);

   res.json({ msg: "Flight Upated successfully" ,"flight":id});
 } catch (error) {
   console.log(error);
   res.json({ msg: "Error in upatiing in flight" });
 }

})
flighttRouter.put('/',async(req,res)=>{
    console.log(req.params);
    const id = req.query.id
 const payload = req.body;
 try {
    const flight = await Flight.findOneAndReplace(id,payload);

   res.json({ msg: "Flight Upated successfully" ,"flight":id});
 } catch (error) {
   console.log(error);
   res.json({ msg: "Error in upatiing in flight" });
 }

})
flighttRouter.delete('/',async(req,res)=>{
    console.log(req.params);
    const id = req.query.id
 const payload = req.body;
 try {
    const flight = await Flight.findByIdAndDelete(id);

   res.json({ msg: "Flight deleted successfully" ,"flight":id});
 } catch (error) {
   console.log(error);
   res.json({ msg: "Error in deleting in flight" });
 }

})

module.exports = {
  flighttRouter,
};
