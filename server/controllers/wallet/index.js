import express from "express";
import {newMnemonic, newWallet,getAccount,getWalletFromOutside,_getBalance} from "./wallet.js";
import {getUser,setUser} from "./user.js";
const router = express.Router();

router.get("/mnemonic",newMnemonic);
router.post("/newwallet",newWallet);
router.get("/account/:userId",getAccount);
router.post("/outsidewallet",getWalletFromOutside);

router.get("/balance/:address",_getBalance); //vote token balance

//router.put("/user/:userId");
//router.delete("/user/:userId");
router.post("/user",setUser);
router.get("/user/:userId",getUser);


export default router;