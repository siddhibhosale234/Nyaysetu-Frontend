// src/ClientProfile.js
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./ClientProfile.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileImage,
  FaBell,
  FaUserCircle
} from "react-icons/fa";
import c from '../signupPage/logo.jpg'
import { baseBookURL } from "../axios";
import { useNavigate } from "react-router-dom";
const ClientProfile = () => {
  const navigate = useNavigate()
  const container = useRef();
  const cardRefs = useRef([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const clientId = localStorage.getItem('clientId')
  const keyMap = {
  name: "Name",
  age: "Age",
  gender: "Gender",
  phone: "Phone",
  email: "Email",
  address: "Address",
  job: "job",
  appointmentFor: "appointmentFor",
  caseDescription: "caseDescription"
};
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".client-container", { opacity: 0, y: 50, duration: 1 });
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        delay: 0.2,
        duration: 0.8,
      });
    }, container);
    return () => ctx.revert();
  }, []);

 const handleEditChange = (e) => {
  const { name, value } = e.target;
  const schemaKey = keyMap[name] || name;
  setProfile((prev) => ({ ...prev, [schemaKey]: value }));
  setErrors((prev) => ({ ...prev, [name]: "" }));
};

  

 const validateForm = () => {
  let newErrors = {};

  if (!profile.Name?.trim()) newErrors.name = "Name is required.";
  if (!profile.Age) newErrors.age = "Age is required.";
  if (!profile.Gender?.trim()) newErrors.gender = "Gender is required.";

  if (!profile.Phone) {
    newErrors.phone = "Phone is required.";
  } else if (!/^\+?\d{10,15}$/.test(profile.Phone)) {
    newErrors.phone = "Enter a valid phone number.";
  }

  if (!profile.Email?.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.Email)) {
    newErrors.email = "Enter a valid email.";
  }

  if (!profile.Address?.trim()) newErrors.address = "Address is required.";
  if (!profile.Job?.trim()) newErrors.job = "Job is required.";
  if (!profile.AppointmentFor?.trim()) newErrors.appointmentFor = "Appointment type is required.";
  if (!profile.CaseDescription?.trim()) newErrors.caseDescription = "Case description is required.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSave = async () => {
  if (!validateForm()) return;

  try {
    const { data } = await baseBookURL.put(`/clientProfile/updateClientProfile/${clientId}`, profile);
    alert(data?.Message);
    setIsEditing(false);
  } catch (err) {
    console.log(err);
    alert("Update failed!");
  }
};

const fetchProfilePhoto = async () => {
  try {
    const fetchedProfilePhoto = await baseBookURL.get(`/profilePic/get/${clientId}`);
    if (fetchedProfilePhoto.data?.Success) {
      setProfilePhoto(fetchedProfilePhoto.data.data.profilePic);
    } else {
      console.log('Error fetching profile photo');
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(()=>{
    async function fetchClientProfile(){
      console.log("Client Id",clientId);
      
      try {
        const {data} = await baseBookURL.get('/clientProfile/getClientProfiles')
        const fetchedProfile = data.clientProfileDataList.find((val)=>val._id===clientId)
        if(fetchedProfile){
            setProfile(fetchedProfile)
        }
        else{
          console.log(fetchedProfile);
          
          alert('An error occurred')
        }
      } catch (error) {
        alert('Check log')
        console.log(error);
        
      }
    }
    if(clientId){
      fetchClientProfile()
      fetchProfilePhoto()
    }
  },[clientId])

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('profilePic', file);

  try {
    const res = await baseBookURL.post(`/profilePic/upload/${clientId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data?.Success) {
      alert(res.data?.Message);
      setProfilePhoto(res.data.data.profilePic);
      fetchProfilePhoto();
    } else {
      alert('Error uploading photo');
    }
  } catch (error) {
    console.log(error);
    alert('Check log');
  }
};

  return (
    <div className="Client-Profile-Page">
    <div className="client-container" ref={container}>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo"><img src={c} alt="" /></div>
        <nav className="nav-links">
          <a href="/clientHome">Home</a>
          <a href="/aboutusclient">About</a>
          <a href="/servicesclient">Services</a>
          <a onClick={()=>{navigate('/reminders?role=client')}}><FaBell size={20} color="#00c9ff" /></a>
          <a onClick={()=>{navigate('/clientprofile')}}><FaUserCircle size={30} color="#00c9ff" /></a>
        </nav>
      </header>

      {/* Profile Info */}
      <div className="profile-box" ref={(el) => (cardRefs.current[0] = el)}>
        <div className="profile-image">
  <img
    src={profilePhoto || "https://cdn-icons-png.flaticon.com/512/145/145867.png"}
    alt="Profile"
    className="avatar"
  />
  <label htmlFor="fileInput" className="upload-btn">+</label>
  <input
    id="fileInput"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleFileChange}
  />
</div>

        <div className="profile-details">
          <h2>{profile.Name}</h2>
          <p>
            Age: <strong>{profile.Age}</strong> | Gender:{" "}
            <strong>{profile.Gender}</strong>
          </p>
          <p>
            <FaPhoneAlt /> {profile.Phone}
          </p>
          <p>
            <FaEnvelope /> {profile.Email}
          </p>
          <p>
            <FaMapMarkerAlt /> {profile.Address}
          </p>
        </div>
        <div className="profile-actions">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            ✏️ Edit
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="meta-info-box profile-box" ref={(el) => (cardRefs.current[1] = el)}>
        <div className="meta-row">
          <span className="meta-label">Job</span>
          <span className="meta-value">{profile.Job || "Not specified"}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Appointment for</span>
          <span className="meta-value">{profile.AppointmentFor || "Not specified"}</span>
        </div>
      </div>

      {/* Case + Docs */}
      <div className="case-docs-container">
        <div className="case-desc profile-box" ref={(el) => (cardRefs.current[2] = el)}>
          <h3>📝 Description of Case</h3>
          <p>{profile.CaseDescription || "Not provided yet."}</p>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h3>Edit Profile</h3>
            <div className="edit-form">
              {[
                "name",
                "age",
                "gender",
                "phone",
                "email",
                "address",
                "job",
                "appointmentFor"
              ].map((field) => (
                <label key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
  type="text"
  name={field}
  value={profile[keyMap[field]] || ""}
  onChange={handleEditChange}
/>
                  {errors[field] && (
                    <div className="error-text">{errors[field]}</div>
                  )}
                </label>
              ))}

              <label>
                Description of Case:
                <textarea
  name="caseDescription"
  value={profile[keyMap["caseDescription"]] || ""}
  onChange={handleEditChange}
  rows="3"
  style={{ width: "100%", padding: "8px" }}
/>

              </label>
            </div>

            <div className="modal-actions">
              <button 
  className="edit-btn" 
  onClick={async () => {
    if (!validateForm()) return;

    try {
      const { data } = await baseBookURL.put(`/clientProfile/updateClientProfile/${clientId}`, profile);
      alert(data?.Message);
      setProfile(profile); // update state with edited values
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  }}
>
  ✅ Save
</button>
              <button className="reset-btn">
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <button 
  className="reset-btn" 
  onClick={async () => {
    if(window.confirm("Are you sure you want to delete your profile?")){
      try {
        const { data } = await baseBookURL.delete(`/clientProfile/deleteClientProfile/${clientId}`);
        alert(data.Message);
        localStorage.removeItem('clientId'); // clear session
        navigate('/choose'); // go back to landing page
      } catch (err) {
        console.log(err);
        alert("Delete failed!");
      }
    }
  }}
>
  🗑️ Delete
</button>
    <button onClick={()=>{navigate('/choose')}}>Logout</button>
    </div>
  );
};

export default ClientProfile;
