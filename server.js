const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db");
const { authenticate } = require("./middelware/authenticate");
const { registerRouter } = require("./routes/register.route");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
console.log("hey");
app.get("/", (req, res) => {
  res.status(200).send({ msg: "this is our base route" });
});


app.use("/api/register", registerRouter);

app.use(authenticate)
app.use("/api/users",userRouter);
app.use("/api/post",postRouter)

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
