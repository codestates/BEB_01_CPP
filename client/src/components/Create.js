import React from 'react';
import "./Create.css";
import { Link } from 'react-router-dom';
//import _src from 'https://www.sgu.ac.kr/_res/sgu_mobile/img/common/prepare.jpg';
import axios from "axios";
// import HomeComponent1 from "./HomeComponent1";




function Create() {
  const getMnemonic = async () =>{
    const mnemonic = await axios.get("http://localhost:8080/wallet/mnemonic");
    //받아서 새로운 component 로 props 보내는거 해서
    //axios.post("http://localhost:8080/wallet/newwallet",{mnemonic, password, username,index});
    //새로운 account가 생성되어서 client로 return
  }

  // const getMnemonic = async () =>{
  //   const mnemonic = await axios.get("http://localhost:8080/wallet/mnemonic%22");
  //   받아서 새로운 component 로 props 보내는거 해서
  //   axios.post("http://localhost:8080/wallet/newwallet%22,%7Bmnemonic, password, username,index});
  //   새로운 account가 생성되어서 client로 return
  // }

    return (
      <div className="mainset">
        
        <div class="select-action__body-header">MetaMask가 처음이세요?</div>

        <div class="select-action__select-buttons">

        <div class="select-action__select-button">


        {/* <img src=_src /> */}

        

        <div class="select-action__button-text-big">아니요. 이미 비밀 복구 구문이 있습니다.</div>
        <div class="select-action__button-text-small">비밀 복구 구문을 사용하여 기존 지갑 가져오기</div>

        
        <Link to="/mypage">
        <button class="button btn--rounded btn-primary first-time-flow__button" role="button" tabindex="0">
                    지갑 가져오기
        
        </button>
        </Link>


        </div>

      <div class="select-action__select-button">
      
        <div class="select-action__button-text-big">설정을 시작하죠!</div>
        <div class="select-action__button-text-small">새 지갑과 시드 구문을 만듭니다.</div>

        
               
        <button class="button btn--rounded btn-primary first-time-flow__button" role="button" tabindex="0" onClick={getMnemonic}>지갑 생성</button>
      
        

      </div>
      </div>
      
      </div>
           
    )
  }
  
  export default Create;

