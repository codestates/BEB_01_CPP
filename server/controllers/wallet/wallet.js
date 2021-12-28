
import { getMnemonic,generateNewWallet} from "../../wallet/index.js";
import {ganacheAccount,getAccountFromDb,newAccountFromPrivateKey,getBalance,sendTestEth}  from "../../models/ethereum.js";
const newMnemonic =  (req, res) =>{
    try {
        const mnemonic = getMnemonic();
        res.send({mnemonic});
    } catch (error) {
        res.status(500).send({error});
    }
    
}

const newWallet =  async (req, res) =>{
   // console.log(req.body);
    const password = req.body.password;
    const mnemonic = req.body.mnemonic;
    try {
        generateNewWallet(mnemonic, password,0, async (address,keystore)=>{
            //console.log(address);
            try {                
                res.send({address});
            } catch (error) {
                console.log(error);
                res.status(502).send({error});
            }
            
        });
        
    } catch (error) {
        res.status(500).send({error});
    }
       
}

const getAccount = async (req,res)=>{
    try {
        const account = await ganacheAccount(); //ganache account -> db에서 불러오는 것으로 바꿔야함
        res.send({account});
    } catch (error) {
        console.log(error);
        res.status(502).send({message:"Error: Get Account Transaction Faield"});
    }
    
}

const getWalletFromOutside = (req,res) =>{
    const privateKey = req.body.privateKey;
    try {
        const accountFromOutside = newAccountFromPrivateKey(privateKey);
        res.send({address:accountFromOutside.address});
    } catch (error) {
        console.log(error);
        res.status(502).send({error});
    }
}

const _getBalance = async (req,res) =>{
    const address = req.params.address;
   
    try {
        const balance = await getBalance(address);
        return res.send({balance});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    }

}

//test
const getTestEth = async (req,res)=>{
    const address = req.params.address;
    try {
        const _send = await sendTestEth(address);
        return res.send({message:"ok"});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    }
}

export {newMnemonic, newWallet,getAccount,getWalletFromOutside,_getBalance,getTestEth};