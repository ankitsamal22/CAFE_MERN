import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js"
import orderRouter from "./routes/orderRoute.js"
import dotenv from 'dotenv'
import cors from "cors" //to connect frontend and backend
const app = express();
app.use(express.json());

app.use(cors()); //frontend ka api

dotenv.config()

const dbuser = encodeURIComponent(process.env.DBUSER)
const dbpass = encodeURIComponent(process.env.DBPASS)

// mongoose.connect("mongodb://localhost:27017/merncafe").then(() => {
//   app.listen(8080, () => {
//     console.log("Server started");
//   });
// });

mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.jwy61tr.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
  app.listen(8080, () => {
    console.log("Server started");
  });
});

app.use("/api/users", userRouter);
app.use("/api/products",productRouter);
app.use("/api/orders", orderRouter);