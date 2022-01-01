import Web3 from "web3";
import dotenv from "dotenv";
import deploy from "./erc20/deploy.js";
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

const deployErc20 = async (name,symbol)=>{
    try {
        const contractAddress = await deploy(web3,name,symbol);
        //contract address db 저장
        //서버가 제공하는 것이 아닌, event 발생할 때 마다 발급하는 형태
        console.log(contractAddress._address);
        return contractAddress;
    } catch (error) {
        console.log(error);
        return false;

    }
}

const sendErc20 = async (_to, amount) =>{
   /*
 const contractAddress = process.env.ERC20;
    const _from = process.env.SERVER_ADDRESS;
    try {
        const contract = new web3.eth.Contract(abi,contractAddress,[{from:_from}]);
        //console.log(contract.methods)
        const receipt = await contract.methods.mintToken(_to,amount).send({from:_from,gas:200000});
        console.log(receipt);
        console.log(await contract.methods.totalSupply().call());
        return contract;
    } catch (error) {
        console.log(error);
        return error;
    }
    

*/
  
}

//test
const sendTestEth = async (address) =>{    
}

export {ganacheAccount,getAccountFromDb,getBalance,newAccountFromPrivateKey,sendEth,unlockAccount,sendErc20,deployErc20}