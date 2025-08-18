import React, { useState } from "react";
import './RoleSelection.css';
import a from './NyaysetuLogo.png'
import {useNavigate} from 'react-router-dom'

export function RoleSelection() {
  const navigate=useNavigate();
  function handleLawyer(){
    navigate("/signup?role=lawyer");
  }
  function handleClient(){
   navigate("/signup?role=client");
  }
    
  return (
    <>
    <div className="Background1">
    <div className="role-selection-body">
      <div className="container6">
        <h1 style={{color:"#ffffff"}}>Welcome to NyaySetu</h1>
<p style={{marginTop: '10px', color: '#cbd5e1', fontSize: '14px'}}>A Bridge to Justice</p>
        <img src={a} alt="Nyaysetu Logo" width="90" height="90" style={{ borderRadius: '8px', backgroundColor: 'transparent' }} />
        <h2 style={{color:"#ffff"}}>Choose your role:</h2>
        <div className="roles">
          <div className="role">
            <img src="https://cdn-icons-png.flaticon.com/512/2710/2710029.png" alt="Lawyer" onClick={handleLawyer}/>
            <span style={{color:"#ffff"}}>LAWYER/<br />ADVOCATE</span>
            <p className="role-desc">Join India's legal network and grow your practice</p> 
          </div>
          <div className="role">
            <img src="data:image/webp;base64,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" alt="Client" onClick={handleClient} />
            <span style={{color:"#ffff"}}>CLIENT</span>
            <p className="role-desc">Seeking legal help tailored to your needs</p> 
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
