import bytecode from "./bytecode.js";
import dotenv from "dotenv";
import abi from "./abi.js";
dotenv.config();

export default async (web3,name, symbol) =>{
    const cpptokenContract = await new web3.eth.Contract(abi);
 //  console.log(cpptokenContract)
    try {
        const cpptoken = await cpptokenContract.deploy({
            data: bytecode.object, 
            arguments: [
                 name,
                 symbol                 
            ]
       }).send({
            from: process.env.SERVER_ADDRESS, 
            gas: '4700000'
          }, (e, contract)=>{
         
           if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
           }
        })
        
        //console.log(cpptoken);
        return cpptoken;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}