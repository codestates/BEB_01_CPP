import express from "express";
import {sendToken} from "./send.js";
const router = express.Router();

router.post("/send",sendToken);

export default router;
