import React from 'react';
// import "./LogIn.css";
import { Link } from 'react-router-dom';
import axios from 'axios';



function Account({ result }) {
  return <div>
    { (result) ? 
    <div>
      <h3>지갑주소(공개키) : {result.address}</h3>
      <p>Keystore : {result.keystore}</p>
    </div> : null }
  </div>
}

export default Account;