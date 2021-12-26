import express from "express";
import {sendToken} from "./send.js";
const route = express.Router();

route.post("/send",sendToken);

export default route;
