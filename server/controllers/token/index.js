import express from "express";
import {deployErc20Token} from "./erc20.js";
import {buyNft} from "./erc721.js";
const router = express.Router();

router.post("/erc20",deployErc20Token);
router.post('/erc721',buyNft);

export default router;