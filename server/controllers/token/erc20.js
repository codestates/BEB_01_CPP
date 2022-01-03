import {deployErc20} from "../../models/ethereum.js";
import Erc20 from "../../models/database/models/Erc20.js";
const deployErc20Token = async (req,res) =>{
    const name = req.body.name;
    const symbol = req.body.symbol;
    try {
        const receipt = await deployErc20(name,symbol);
        if(receipt){
            //console.log(receipt);
            const address = receipt._address;
            if (!name && !symbol && !address) return res.status(400).send({ err: 'name, symbol, address is required' });
            const erc20 = new Erc20({name,value:{symbol,address}});
            await erc20.save();
            return res.send({address,id:erc20._id});
        }else{
            return res.status(502).send({message:"deploy fail"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    }
}


/**
 try {
    const { name, symbol, address } = req.body;
    if (!name && !symbol && !address) return res.status(400).send({ err: 'name, symbol, address is required' });
    const erc20 = new Erc20(req.body);
    await erc20.save();
    return res.send({ erc20 })
  }catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
 */


export {deployErc20Token};