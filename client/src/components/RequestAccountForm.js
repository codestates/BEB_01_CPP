import { useState } from 'react'
import  axios from 'axios';
import React from 'react';
// import "./LogIn.css";
import { Link } from 'react-router-dom';
// import axios from 'axios';




function RequestAccountForm({ requestAccount }) {
  const [inputMnemonic, setInputMnemonic] = useState('')
  const [inputId, setInputId] = useState('')
  const [inputPwd, setInputPwd] = useState('')

  const handleChangeMne = (e) => {
    setInputMnemonic(e.target.value)
  }

  const handleChangeId = (e) => {
    setInputId(e.target.value)
  }

  const handleChangePwd = (e) => {
    setInputPwd(e.target.value)
  }

  // const handleRequestClick = () => {
  //   requestAccount(inputMnemonic, inputId);
  // }

  const handleRequestClick = () => {
    requestAccount(inputMnemonic, inputPwd);
  }


  return <fieldset id="request-account-container">
    <legend>새 지갑주소 생성</legend>
    <div>
      <textarea id="textarea-mne" value={inputMnemonic} onChange={handleChangeMne} placeholder="니모닉 코드 입력" />
    </div>

    <div>
      <input type="idtext" value={inputId} onChange={handleChangeId} placeholder="임의 아이디 입력" />
    </div>

    <div>
      <input type="pwdtext" value={inputPwd} onChange={handleChangePwd} placeholder="임의 패스워드 입력" />
    </div>
    <p>
      <button id="request-btn" onClick={handleRequestClick}>지갑 생성 요청</button>
    </p>
  </fieldset>
}

export default RequestAccountForm