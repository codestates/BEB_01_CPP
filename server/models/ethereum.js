import Web3 from "web3";
import dotenv from "dotenv";

dotenv.config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK));


const ganacheAccount = async () =>{
    try {
        const accounts = await web3.eth.getAccounts();
        return accounts;
    } catch (error) {
        console.log(error);
        return false;

    }
}

const getAccountFromDb = async (key) =>{
    //db에서 비밀키 받아옴
    const account = await web3.eth.account.privateKeyToAccount(key);
    
};

const getBalance = async (address)=>{
    return await web3.eth.getBalance(address);
}

const newAccountFromPrivateKey =  (privateKey)=>{
    return web3.eth.accounts.privateKeyToAccount(privateKey);
}

const unlockAccount = (address,privateKey) =>{

}

const sendEth = (to,from,amount) =>{

}
//test
const sendTestEth = async (address) =>{
    const from = "0x9784a0B996D71d8D11a9D2e6e0834Fcfb4A9e843";
    const _privateKey = "faf99975ad3fe9c0eb091c7ff1d0cefd69920bd84a54abfee1eb167c7b893d14";
    const eth = 5;

    

    
}

export {ganacheAccount,getAccountFromDb,getBalance,newAccountFromPrivateKey,sendEth,unlockAccount,sendTestEth}