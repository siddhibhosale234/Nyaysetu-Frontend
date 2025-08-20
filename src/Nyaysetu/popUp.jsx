import { useEffect, useState } from "react";
import './popUp.css'
import { baseBookURL } from "../axios";
import { useNavigate } from "react-router-dom";
export function PopUp(){
    const [showPopUp,setShowPopUp]  = useState(true);
    const [lawyerName,setLawyerName] = useState('')
    const id = localStorage.getItem("lawyerProfile")
    const navigate = useNavigate()
    console.log("Lawyer ID from localStorage:", id);
    useEffect(()=>{
      const handleLawyerName = async()=>{
        try{
        const details = await baseBookURL.get(`/lawyerProfile/getSingleProfile/${id}`)
        setLawyerName(details.data.singleLawyerProfile?.Name || '')  
    }
    catch(error){
      alert('some error occurred')
      navigate('/error')
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
