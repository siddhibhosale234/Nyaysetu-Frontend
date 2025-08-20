// Profile1.jsx
import { useEffect, useState } from 'react';
import { baseBookURL } from '../axios';
import './Profile1.css';

export function Profile1() {
  const id = localStorage.getItem('lawyerProfile')
  const [profileInfo,setProfileInfo] = useState(null)
  const [profilePhoto,setProfilePhoto] = useState(null)
  const fetchProfilePhoto = async()=>{
    try {
      const fetchedProfilePhoto = await baseBookURL.get(`/profilePic/get/${id}`)
      if(fetchedProfilePhoto.data?.Success){
        setProfilePhoto(fetchedProfilePhoto.data.data.profilePic)
      }
      else{
        alert('Error in fetching profile photo')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{const fetchDetailsForProfile = async()=>{
    try{
    const fetchedDetails = await baseBookURL.get(`/lawyerProfile/getSingleProfile/${id}`);
    setProfileInfo(fetchedDetails.data.singleLawyerProfile)
    }
    catch(error){
      console.log("Error in fetching info:",error);
      
    }
  }
  
  if(id){
    fetchDetailsForProfile();
    fetchProfilePhoto();
  }
},[id])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if(!file){return;}
    const formData = new FormData();
    formData.append('profilePic',file)
    try {
      const profilePicUpload = await baseBookURL.post(`/profilePic/upload/${id}`,formData, {headers: { "Content-Type": "multipart/form-data"} });
      if(profilePicUpload.data?.Success){
        alert(profilePicUpload.data?.Message);
        setProfilePhoto(profilePicUpload.data.data.profilePic)
        fetchProfilePhoto();
      }
      else{
        alert('Some error uploading photo')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  if(!profileInfo){
    return <div>Loading....</div>
  }
  
  return (
    <div className="profile1-container">
      <div className="profile1-card">
        <div className="profile1-image">
          <img src={profilePhoto || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="ProfilePhoto" />
          {/* Upload Button */}
          <label htmlFor="fileInput" className="upload-btn">+</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="profile1-info">
          <h2>{profileInfo.Name}</h2>
          <ul style={{color:"#15495f"}}>
            <li style={{color:"#15495f"}}><strong>City:</strong> {profileInfo.City}</li>
            <li style={{color:"#15495f"}}><strong>Experience:</strong> {profileInfo.Experience}</li>
            <li style={{color:"#15495f"}}><strong>Court Level:</strong> {profileInfo.CourtLevel}</li>
            <li style={{color:"#15495f"}}><strong>Document Type:</strong> {profileInfo.DocumentType}</li>
            <li style={{color:"#15495f"}}><strong>Service Type:</strong> {profileInfo.ServiceType}</li>
            <li style={{color:"#15495f"}}><strong>Language Preference:</strong> {profileInfo.Language}</li>
            <li style={{color:"#15495f"}}><strong>Location:</strong> {profileInfo.Location}</li>
            <li style={{color:"#15495f"}}><strong>Mode of Service:</strong> {profileInfo.ModeOfService}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}