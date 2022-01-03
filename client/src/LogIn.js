import React from 'react';
import "./LogIn.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


import lightwallet from 'eth-lightwallet';
// import Head from 'next/head'
import { useState } from 'react'
import RequestMnemonicForm from './components/RequestMnemonicForm'
import RequestAccountForm from './components/RequestAccountForm'
import Mnemonic from './components/Mnemonic'
import Account from './components/Account'
/**
 *  RequestMnemonicForm : 니모닉 요청 콤포넌트
 *  RequestAccountFrom  : 지갑주소 요청 콤포넌트 
 *  Mnemonic : 니모닉 결과 콤포넌트
 *  Account : 지갑주소 결과 콤포넌트
 */

  

  function LogIn() {

  // const getMnemonic = async () =>{
  //   const mnemonic = await axios.get("http://localhost:8080/wallet/mnemonic%22");
  //   받아서 새로운 component 로 props 보내는거 해서
  //   axios.post("http://localhost:8080/wallet/newwallet%22,%7Bmnemonic, password, username,index});
  //   새로운 account가 생성되어서 client로 return
  // }



    // 니모닉 및 지갑주소 결과값 저장
    const [mnemonicResult, setMnemonicResult] = useState();
    const [accountResult, setAccountResult] = useState();
  
    const requestMnemonic = () => {   // 니모닉 요청
      const mnemonic = lightwallet.keystore.generateRandomSeed();
      setMnemonicResult(mnemonic);
    }
  
    // 지갑주소 요청
    const requestAccount = (mne, pwd) => {    // 지갑주소 요청
      lightwallet.keystore.createVault({
        password: pwd, 
        seedPhrase: mne,
        hdPathString: "m/0'/0'/0'"
      }, function (err, ks) {
        ks.keyFromPassword(pwd, function (err, pwDerivedKey) {
          ks.generateNewAddress(pwDerivedKey, 1);
          
          let address = (ks.getAddresses()).toString();
          let keystore = ks.serialize();
  
          setAccountResult({ keystore, address });
        });
      });
    }
  
    return (
      <div>
        <div>
          <title>새로운 계정 생성</title>
          <link rel="icon" href="/favicon.ico" />
        </div>
  
        <main>
          <h1>
          새로운 계정 생성
          </h1>
          <div id="mnemonic-container">
            <RequestMnemonicForm requestMnemonic={ requestMnemonic } />
            <Mnemonic result={mnemonicResult} />
          </div>
          <div>
            <RequestAccountForm requestAccount={ requestAccount }/>
            <Account result={accountResult} />
          </div>
        </main>
      </div>
    )
  }
  

  export default LogIn;