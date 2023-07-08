import express ,{ Request,Response }  from "express";
import dotenv from "dotenv";
import { connection } from "./config/db";
import { userRouter } from "./router/userRouter";
import { BookRouter } from "./router/bookRouter";
import logger from "./middleware/logger";
dotenv.config();

const app = express();

app.use(express.json());
app.use(logger);
const PORT = process.env.PORT || 8080;

app.use("/api/user",userRouter)
app.use("/api/books",BookRouter)

app.get("/",(req:Request,res : Response)=>{
  res.send({message:'this is a base router'})
})

app.listen(PORT, async () => {
  try {
    await connection()
    console.log("Connection to DB successful");
    console.log(`SERVER RUNNING ON ${PORT}`);
  } catch (error) {
    console.log(error)
  }
});
