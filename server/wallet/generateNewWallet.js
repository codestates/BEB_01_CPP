import lightwallet from "eth-lightwallet";
import { newAccountFromPrivateKey } from "../models/ethereum.js";
export default (mnemonic, password,index,cb) => {
    try {
        return lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase: mnemonic,
                hdPathString: `m/44'/60'/0'/0 /${index}'` //개인키, 44, ethereum, 0번째 account, 잔돈계정(ethereum은 0), 0번째 주소
            },
           (err, ks) => {
                ks.keyFromPassword(password, async (err, pwDerivedKey) => {
                    ks.generateNewAddress(pwDerivedKey, 1);

                   let address = ( ks.getAddresses()).toString();
                   let keystore =  ks.serialize();
                   const privateKey = ks.exportPrivateKey(address, pwDerivedKey);
                   const deployAccount = newAccountFromPrivateKey(`0x${privateKey}`);
                   //db에 저장
                   cb(address,keystore);
               });
           }
        );
        
    } catch (exception) {
        //console.log(exception);
        return exception;
    }
}