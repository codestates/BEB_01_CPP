import express from "express";
import wallet from "./wallet/index.js"

const router = express.Router();

router.use("/wallet",wallet);



export default router;
