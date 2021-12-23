import express from "express";
import {newMnemonic, newWallet} from "./wallet.js";

const route = express.Router();

route.get("/mnemonic",newMnemonic);
route.post("/newwallet",newWallet);

export default route;