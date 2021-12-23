import { getMnemonic,generateNewWallet} from "../../wallet/index.js";

const newMnemonic =  (req, res) =>{
    try {
        const mnemonic = getMnemonic();
        res.send({mnemonic});
    } catch (error) {
        res.status(500).send({error});
    }
    
}

const newWallet =  async (req, res) =>{
    const password = req.body.password;
    const mnemonic = req.body.mnemonic;
    try {
        const account = await generateNewWallet(mnemonic, password);
        res.send({account});
    } catch (error) {
        res.status(500).send({error});
    }
    
}

export {newMnemonic, newWallet};