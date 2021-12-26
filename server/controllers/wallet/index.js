import express from "express";
import {newMnemonic, newWallet,getAccount,getWalletFromOutside} from "./wallet.js";

const route = express.Router();

route.get("/mnemonic",newMnemonic);
route.post("/newwallet",newWallet);
route.get("/account",getAccount);
route.post("/outsidewallet",getWalletFromOutside);

export default route;