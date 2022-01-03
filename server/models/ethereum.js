import Web3 from "web3";
import dotenv from "dotenv";
import deploy from "./erc20/deploy.js";
import voteTokenAbi from "./vote/voteTokenAbi.js";
import nftAbi from "./erc721/abi.js";
import voteAbi from "./vote/voteAbi.js";
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
    return account;
};

//vote token balance
const getBalance = async (_address)=>{   
    try {
        const address = web3.utils.toChecksumAddress(_address);
        const tokenContract = new web3.eth.Contract(voteTokenAbi,process.env.VOTE_TOKEN,{from:process.env.SERVER_ADDRESS});

        return await tokenContract.methods.balanceOf(address).call();
    } catch (error) {
        console.log(error);
        return false;
    }
    
}

const newAccountFromPrivateKey =  (privateKey)=>{
    return web3.eth.accounts.privateKeyToAccount(privateKey);
}

const mintVoteToken = async (_to, amount) =>{
    try {
        const to = web3.utils.toChecksumAddress(_to);
        //console.log(to);
        const tokenContract = new web3.eth.Contract(voteTokenAbi,process.env.VOTE_TOKEN,{from:process.env.SERVER_ADDRESS,gas:2000000});
        const _mint = await tokenContract.methods.mintToken(to,process.env.ERC721,amount).send({from:process.env.SERVER_ADDRESS});
        //console.log(_mint);
        return _mint;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const deployErc20 = async (name,symbol)=>{
    try {
        const contractAddress = await deploy(web3,name,symbol);
        return contractAddress;
    } catch (error) {
        console.log(error);
        return false;

    }
}
const getTotalNft = async ()=>{
    try {
        const _erc721 = new web3.eth.Contract(nftAbi,process.env.ERC721,{from:process.env.SERVER_ADDRESS});
        const total =  _erc721.methods.totalSupply().call();
        return total;
    } catch (error) {
        console.log(error);
        return false;
    }
}
const isNftOwner = async (address) =>{
    try {
        const _erc721 = new web3.eth.Contract(nftAbi,process.env.ERC721,{from:process.env.SERVER_ADDRESS,gas:2000000});
        const _address = web3.utils.toChecksumAddress(address);
        //console.log(_address);
        return await _erc721.methods.isOwner(_address).call();
    } catch (error) {
        console.log(error);
        return false;
    }
}

const voteSuggest = async (address, suggestion) =>{
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS,gas:2000000});
        const proponent = web3.utils.toChecksumAddress(address);
        const _suggest = await voteContract.methods.suggest(proponent,suggestion).send({from:process.env.SERVER_ADDRESS});
        if(_suggest){
            const idx = await  voteContract.methods.getIdx().call();
            return idx;
        }
        return 0;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getSuggestion = async (idx)=>{
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS,gas:2000000});
        return await voteContract.methods.getSuggest(idx).call();
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getProponent =async (idx)=>{
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS,gas:2000000});
        return await voteContract.methods.getProponent(idx).call();
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getTotalSuggest = async ()=>{
    let suggestSet = [];
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS,gas:2000000});
        const latest = await voteContract.methods.getLatest().call();
        for(let i=1;i<=latest;i++){
            const _suggestion = await voteContract.methods.getSuggest(i).call();
            if( _suggestion !== ""){
                suggestSet.push([i,_suggestion]);
            }
        }
        return suggestSet;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getPassedSuggest = async () =>{
    let suggestSet = [];
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS});
        const latest = await voteContract.methods.getLatest().call();
       //console.log(latest);
        for(let i=1;i<=latest;i++){
            const _suggestion = await voteContract.methods.getPassSuggestion(i).call();
            //console.log(_suggestion);
            if( _suggestion !== ""){
                suggestSet.push([i,_suggestion]);
            }
        }
        return suggestSet;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const voting = async (idx,address,choose) =>{
    try {
        const voteContract = new web3.eth.Contract(voteAbi,process.env.VOTE,{from:process.env.SERVER_ADDRESS});
        const totalVoter = await new web3.eth.Contract(nftAbi,process.env.ERC721,({from:process.env.SERVER_ADDRESS})).methods.totalSupply().call();
        const cutline = parseInt(totalVoter/3);
        console.log(cutline);
        const suggester = await voteContract.methods.getProponent(idx).call();
        const to = web3.utils.toChecksumAddress(address);
        const result = await voteContract.methods.voting(idx,choose,cutline*2+1,cutline).send({from:process.env.SERVER_ADDRESS});
        if(result === "pass"){
            //통과=>제안자에게 100토큰
            try {
                await mintVoteToken(suggester,100);
            } catch (error) {
                console.log(error);
            }
            
        }
        //투표자에게 10토큰
        try {
            await mintVoteToken(to,10);
        } catch (error) {
            console.log(error);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const mintNft = async (address,tokenURI) =>{
    try {
        const nftContract = new web3.eth.Contract(nftAbi,process.env.ERC721,({from:process.env.SERVER_ADDRESS,gas:2000000}));
        const to = web3.utils.toChecksumAddress(address);
        const minting = await nftContract.methods.mintNFT(to,tokenURI).send({from:process.env.SERVER_ADDRESS});
        return minting;

    } catch (error) {
        console.log(error);
        return false;
    }
}

//test
const sendTestEth = async (address) =>{    
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

export {getTotalNft,mintNft,getPassedSuggest,voting,getTotalSuggest,getProponent,getSuggestion,voteSuggest,ganacheAccount,getAccountFromDb,getBalance,newAccountFromPrivateKey,sendErc20,deployErc20,mintVoteToken,isNftOwner}