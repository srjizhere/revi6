const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db");
const { registerRouter } = require("./routes/register.route");
const { loginRouter } = require("./routes/login.route");
const { flighttRouter } = require("./routes/flight.route");
const { bookingRouter } = require("./routes/booking.routes");
const { dashRouter } = require("./routes/dashboard.routes");
const { authenticate } = require("./middleware/authenticate");


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.get("/",(req,res)=>{
res.status(200).send({"msg":"this is our base route"});
});
app.use("/api/register",registerRouter)
app.use("/api/login",loginRouter);
app.use(authenticate);
app.use("/api/flights",flighttRouter);
app.use("/api/booking",bookingRouter);
app.use("/api/dashboard",dashRouter);


app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log(`Listening on ${PORT}`);
  } catch (error) {
    console.log("Failed while connecting to Database");
    console.log(error);
  }
});
