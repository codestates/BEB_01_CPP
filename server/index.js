import express from "express";
import route from "./controllers/index.js";
import dotenv from "dotenv";
import  mongoose from 'mongoose';
dotenv.config();
const MONGO_URI = process.env.DBURL;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",route);

app.listen(port,()=>{
    console.log("start server");
})