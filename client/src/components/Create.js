import React from 'react';
import "./Create.css";
import { Link } from 'react-router-dom';
// import HomeComponent1 from "./HomeComponent1";




function Create() {

    return (
      <div className="mainset">
        
        <div class="select-action__body-header">MetaMask가 처음이세요?</div>

        <div class="select-action__select-buttons">

        <div class="select-action__select-button">


        {/* <img src={'https://www.sgu.ac.kr/_res/sgu_mobile/img/common/prepare.jpg'} /> */}

        

        <div class="select-action__button-text-big">아니요. 이미 비밀 복구 구문이 있습니다.</div>
        <div class="select-action__button-text-small">비밀 복구 구문을 사용하여 기존 지갑 가져오기</div>
        <button class="button btn--rounded btn-primary first-time-flow__button" role="button" tabindex="0">지갑 가져오기</button>
      </div>

      <div class="select-action__select-button">
      
        <div class="select-action__button-text-big">설정을 시작하죠!</div>
        <div class="select-action__button-text-small">새 지갑과 시드 구문을 만듭니다.</div>

        
               
        <button class="button btn--rounded btn-primary first-time-flow__button" role="button" tabindex="0">지갑 생성</button>
      
        

      </div>
      </div>
      
      </div>
           
    )
  }
  
  export default Create;

