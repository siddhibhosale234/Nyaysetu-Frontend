import { useEffect, useState } from "react";
import './popUp.css'
import { baseBookURL } from "../axios";
export function PopUp(){
    const [showPopUp,setShowPopUp]  = useState(true);
    const [lawyerName,setLawyerName] = useState('')
    const id = localStorage.getItem("lawyerProfile")
    console.log("Lawyer ID from localStorage:", id);
    useEffect(()=>{
      const handleLawyerName = async()=>{
        try{
        const details = await baseBookURL.get(`/lawyerProfile/getSingleProfile/${id}`)
        setLawyerName(details.data.singleLawyerProfile?.Name || '')  
    }
    catch(error){
      alert('some error occurred')
    }
  };
    if(id){
      handleLawyerName();
    }
    },[id]);
    
    return(<>
{showPopUp && (
  
        <div className="popUp">
          <h1>Welcome Adv.{lawyerName}</h1>
          <h3>Every client crosses a bridge of hope to reach you — uphold the trust, deliver the justice.</h3>
          <button onClick={() => setShowPopUp(false)}>Let's get started</button>
        </div>
      )}</>
    )
}
