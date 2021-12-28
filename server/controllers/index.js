import express from "express";
import wallet from "./wallet/index.js"
import transaction from "./transaction/index.js";

const router = express.Router();

router.use("/wallet",wallet);
//router.use("/transaction".transaction);

export default router;
