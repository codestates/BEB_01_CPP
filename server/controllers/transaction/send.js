import {sendEth,unlockAccount} from "../../models/ethereum.js";
const sendToken = (req,res) =>{
    const _to = req.body.to;
    const _from = req.body.from;
    const amount = req.body.amount;
    try {
        //db에서 private key 불러옴
        //unlock account
        //send
        return res.send({message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    } 
}

export {sendToken}