import express, { application } from "express";
import route from "./controllers/index.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",route);

app.listen(port,()=>{
    console.log("start server");
})