import express from "express";
import wallet from "./wallet/index.js"
import transaction from "./transaction/index.js";
import token from "./token/index.js";
import vote from "./vote/index.js";

const router = express.Router();

router.use("/wallet",wallet);
router.use("/transaction",transaction);
router.use("/token",token);
router.use("/vote",vote);

export default router;
