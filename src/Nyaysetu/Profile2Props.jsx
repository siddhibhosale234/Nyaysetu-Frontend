import './Profile2.css';
import { Profile2 } from './Profile2';
import { useEffect, useState } from 'react';
import { baseBookURL } from '../axios';

export function Profile2Props() {
  const id = localStorage.getItem('lawyerProfile')
  const [specializations,setSpecializations] = useState([])
  const specializationIcons = {
    "Civil Law":"https://cdn-icons-png.flaticon.com/128/15624/15624602.png",
    "Criminal Law":"https://cdn-icons-png.flaticon.com/128/10236/10236893.png",
    "Family Law":"https://cdn-icons-png.flaticon.com/128/10642/10642228.png",
    "Accident Law":"https://cdn-icons-png.flaticon.com/128/2125/2125190.png",
    "Labour Law":"https://cdn-icons-png.flaticon.com/128/7376/7376399.png",
    "Consumer Protection":"https://cdn-icons-png.flaticon.com/128/17540/17540825.png",
    "Cooperative Society":"https://cdn-icons-png.flaticon.com/128/11127/11127048.png",
    "Real Estate":"https://cdn-icons-png.flaticon.com/128/2238/2238337.png",
    "Corporate Law":"https://cdn-icons-png.flaticon.com/128/10496/10496397.png",
    "Intellectual Property":"https://cdn-icons-png.flaticon.com/128/2329/2329248.png",
    "Taxation":"https://cdn-icons-png.flaticon.com/128/3398/3398099.png",
    "Service Law":"https://cdn-icons-png.flaticon.com/128/17930/17930915.png",
    "Cyber Law":"https://cdn-icons-png.flaticon.com/128/15446/15446048.png",
    "Banking and Finance Law":"https://cdn-icons-png.flaticon.com/128/10642/10642098.png",
    "Arbitration and Mediation":"https://cdn-icons-png.flaticon.com/128/12002/12002168.png",
    "Constitutional Law and Writs":"https://cdn-icons-png.flaticon.com/128/5742/5742285.png",
    "Environmental Law":"https://cdn-icons-png.flaticon.com/128/18780/18780449.png",
    "IT/Tech Legal":"https://cdn-icons-png.flaticon.com/128/3868/3868940.png"}

    useEffect(()=>{
    const fetchprofile = async()=>{
      try{
        const profile = await baseBookURL.get(`/lawyerProfile/getSingleProfile/${id}`)
        const lawyerProfile = profile.data.singleLawyerProfile;
        const profileCards = lawyerProfile.Specialization.map((spec)=>({
          icon:specializationIcons[spec] || "https://cdn-icons-png.flaticon.com/128/924/924954.png",
          title:spec
        })) || [];
        setSpecializations(profileCards);
      }
        catch(error){
           console.log("Error in fetching profile:",error);
           
        }
    }
    if(id){
      fetchprofile();
    }
  },[id])

  return (
    <div className="lawyer-specializations">
      <h2>Legal Specializations</h2>
      <div className="specialization-grid">
        {specializations.map((val, index) => (
          <Profile2 key={index} p={val} />
        ))}
      </div>
    </div>
  );
}
