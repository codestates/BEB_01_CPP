import express from "express";
import {sendToken,serverToken} from "./send.js";
const router = express.Router();

router.post("/send",sendToken);
router.post("/servertoken",serverToken)
export default router;
