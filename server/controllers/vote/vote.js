import {voting,isNftOwner,voteSuggest,getSuggestion,getProponent,getTotalSuggest,getPassedSuggest} from "../../models/ethereum.js";

const checkNft = async (address)=>{
   return await isNftOwner(address);
}

const setSuggest = async (req,res)=>{
    const address = req.body.address;
    const suggestion = req.body.suggestion;
    if(await checkNft(address)){
        try {
            const suggestionIdx = await voteSuggest(address,suggestion);
            //db 저장
            return res.send({suggestionIdx});
        } catch (error) {
            console.log(error);
            return res.status(502).send({message:"error"});
        }
    }else{
        res.status(502).send({error:"wrong address"});
    }
}

const getSuggestByIdx = async (req,res)=>{
    const idx = req.params.suggestionIdx;
    
    try {
        const _suggestion = await getSuggestion(idx);
        return res.send({suggestion:_suggestion});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error:"wrong number"});
    }
}

const getProponentByIdx = async (req,res)=>{
    const idx = req.params.suggestionIdx;
    
    try {
        const proponent = await getProponent(idx);
        return res.send({proponent});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error:"wrong number"});
    }
}

const getTotalSuggestion = async (req,res)=>{
    try {
        const total = await getTotalSuggest();
        res.send({total});//[index,suggestion]
    } catch (error) {
        console.log(error);
        res.status(502).send({error:"error"});
    }
}

const vote = async (req,res) =>{
    const idx = req.body.suggestionIdx;
    const address = req.body.address;//투표자 address
    const _vote = req.body.vote || 0;//찬성 : 1, 반대 : 0
    if(await checkNft(address)){
        try {
            if(await voting(idx,address,_vote)){
                res.send({message:"ok"});
            }
        } catch (error) {
           console.log(error);
           res.status(502).send({message:"no authority"});
        }
    }
   
}

const getPassSuggestion = async (req,res) =>{
    try {
        const total = await getPassedSuggest();
        res.send({total});//[index,suggestion]
    } catch (error) {
        console.log(error);
        res.status(502).send({error:"error"});
    }
}

export {getPassSuggestion,vote,getTotalSuggestion,getProponentByIdx,getSuggestByIdx,setSuggest};