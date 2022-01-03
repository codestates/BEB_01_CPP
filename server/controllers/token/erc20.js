import {deployErc20} from "../../models/ethereum.js";
const deployErc20Token = async (req,res) =>{
    const name = req.body.name;
    const symbol = req.body.symbol;
    try {
        const receipt = await deployErc20(name,symbol);
        if(receipt){
            return res.send({message:"deploy success"});
        }else{
            return res.status(502).send({message:"deploy fail"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    }
}


export {deployErc20Token};