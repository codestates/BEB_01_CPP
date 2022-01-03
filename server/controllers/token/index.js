import express from "express";
import {deployErc20Token} from "./erc20.js";

const router = express.Router();

router.post("/erc20",deployErc20Token);

export default router;