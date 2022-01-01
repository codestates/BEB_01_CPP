import express from "express";
import {newMnemonic, newWallet,getAccount,getWalletFromOutside,_getBalance} from "./wallet.js";

const router = express.Router();

router.get("/mnemonic",newMnemonic);
router.post("/newwallet",newWallet);
router.get("/account",getAccount);
router.post("/outsidewallet",getWalletFromOutside);
router.get("/balance/:address",_getBalance);


export default router;