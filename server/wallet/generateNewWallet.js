import lightwallet from "eth-lightwallet";

export default  (mnemonic, password) => {
    try {
        lightwallet.keystore.createVault(
            {
                password: password,
                seedPhrase: mnemonic,
                hdPathString: `m/44'/60'/0'/0/0'` //개인키, 44, ethereum, 0번째 account, 잔돈계정(ethereum은 0), 0번째 주소
            },
           (err, ks) => {
                 ks.keyFromPassword(password, (err, pwDerivedKey) => {
                     ks.generateNewAddress(pwDerivedKey, 1);

                    let address = ( ks.getAddresses()).toString();
                    let keystore =  ks.serialize();
                    //db에 저장
                    //res.json({ keystore: keystore, address: address });
                    return address;
                });
            }
        );
    } catch (exception) {
        //console.log(exception);
        return exception;
    }
}