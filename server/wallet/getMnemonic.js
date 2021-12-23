import lightwallet from "eth-lightwallet";


export default  () => {
    let mnemonic;
    try {
        mnemonic =  lightwallet.keystore.generateRandomSeed();
        return mnemonic;
    } catch (err) {
        //console.log(err);
        return error;
    }
}