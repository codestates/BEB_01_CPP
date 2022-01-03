import {mintNft,getTotalNft} from "../../models/ethereum.js";

const buyNft = async (req,res) =>{
    const address = req.body.address;
    const tokenURI = `cpp vote for ${address}`;
    try {
        const receipt = await mintNft(address,tokenURI);
        if(receipt){
            const nftId = await getTotalNft();
            return res.send({nftId});
        }
        return res.send({message:"fail"});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    }
}
export {buyNft};