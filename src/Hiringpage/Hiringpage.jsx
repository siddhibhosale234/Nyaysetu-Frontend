import React, { useState, useEffect } from "react";
import "./Hiringpage.css";
import nyaysetulogo from "./NyaysetuLogo.png";
import { baseBookURL } from "../axios";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { ClientChatRedirect } from "./ClientChatRedirect";
// import lawyer1 from "./Assets/lawyer1.jpeg";
// import lawyer2 from "./Assets/lawyer2.jpg";
// import lawyer3 from "./Assets/lawyer3.jpg";
// import lawyer4 from "./Assets/lawyer4.jpg";
// import lawyer5 from "./Assets/lawyer5.jpg";

export function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="navbarHire">
      <div className="logoHire">
        <img src={nyaysetulogo} alt="NyaySetu Logo" />
        <span className="logo-textHire">NyaySetu</span>
      </div>
      <ul className="nav-linksHire">
        <li><a href="/clientHome">Home</a></li>
        <li><a href="/servicesclient">Services</a></li>
        <li><a href="/hiringpage">Hire</a></li>
        <li><a href="/aboutusclient">About</a></li>
        <li onClick={()=>{navigate('/reminders?role=client')}}><FaBell size={20} color="#00c9ff" /></li>
        <li onClick={()=>{navigate('/clientprofile')}}><FaUserCircle size={30} color="#00c9ff" /></li>
      </ul>
    </nav>
  );
}

export default function HiringPage() {
  const userId = localStorage.getItem('clientId')
  const [lawyers, setLawyers] = useState([]);      
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [requestedLawyers,setRequestedLawyers] = useState([])
  const [profilePhotos, setProfilePhotos] = useState({});
  useEffect(() => {
  async function fetchLawyerProfile() {
    try {
      const { data } = await baseBookURL.get('/lawyerProfile/getLawyerProfiles');
      if (data?.lawyerProfileDataList) {
        setLawyers(data.lawyerProfileDataList);
        setFiltered(data.lawyerProfileDataList);

        // Fetch profile photos
        const photos = {};
        await Promise.all(
          data.lawyerProfileDataList.map(async (lawyer) => {
            try {
              const res = await baseBookURL.get(`/profilePic/get/${lawyer.userId}`);
              if (res.data?.Success && res.data.data?.profilePic) {
                photos[lawyer.userId] = res.data.data.profilePic;
;
              } else {
                photos[lawyer.userId] = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // fallback
              }
            } catch (err) {
              photos[lawyer.userId] = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
            }
          })
        );
        setProfilePhotos(photos);

      } else {
        alert('failed');
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchLawyerProfile();
}, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
        },
        () => {
          setLat(28.6139);
          setLng(77.2090);
        }
      );
    }
  }, []);

  const handleSearch = () => {
  if (!query.trim()) {
    setFiltered(lawyers);
    return;
  }
  const q = query.toLowerCase();
  setFiltered(
    lawyers.filter((l) => {
      const nameMatch = (l.Name || "").toLowerCase().includes(q);
      const locationMatch = (l.Location || "").toLowerCase().includes(q);
      const specializationMatch = Array.isArray(l.Specialization) 
        && l.Specialization.some(spec => spec.toLowerCase().includes(q));

      return nameMatch || locationMatch || specializationMatch;
    })
  );
};
const handleHireRequest = async(lawyerID)=>{
      const requestData = {
        lawyerID:lawyerID,
        clientID:userId
      }
      console.log(requestData);
      
      try{
      const {data} = await baseBookURL.post('/hireRequest/addHireRequest',requestData)
      if(data?.Success){
        alert('Request Sent, You can chat with Lawyer soon')
        setRequestedLawyers((prev)=>[...prev,lawyerID])
      }
      else{
        alert('Something is wrong')
      }
    }
    catch(error){
      alert('Check log')
      console.log(error);
      
    }
  }


  return (
    <>
    <ClientChatRedirect />
      <div className="hiringBody">
      <Navbar />
      <section className="hiring-section" id="hire">
        <div className="hiring-header">
          <h2 className="hiring-title">Find Lawyers Near You</h2>
          <p>Browse verified profiles and request an appointment.</p>
        </div>

        <div className="search-area hiring-card">
          <input
            type="text"
            placeholder="Search by name, specialty or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="apply-btn" onClick={handleSearch}>Search</button>
        </div>

        <div className="map-wrapper hiring-card">
          {lat && lng ? (
            <iframe
              title="user-map"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`}
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: 12 }}
              loading="lazy"
            />
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        <div className="hiring-grid">
          {filtered.length === 0 ? (
            <div className="hiring-card">
              <h3>No lawyers found</h3>
              <p>Try a different search or clear the input.</p>
            </div>
          ) : (
            filtered.map((lawyers) => (
              <div key={lawyers._id} className="hiring-card">
                <img 
                  src={profilePhotos[lawyers.userId] || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} 
                  alt={lawyers.Name} 
                  className="card-image" 
                />
                <h3>{lawyers.Name}</h3>
                <p className="specialty" >{lawyers.Specialization}</p>
                <p>📍 {lawyers.Location}</p>
                <p>✉️ {lawyers.Email}</p>
                <button className="chat-btn" onClick={()=>handleHireRequest(lawyers._id)} disabled={requestedLawyers.includes(lawyers._id)}>{requestedLawyers.includes(lawyers._id)?"Request Sent":"Chat with Lawyer"}</button>
              </div>
            ))
          )}
        </div>

       <footer className="main-footer">
      <div className="footer-left">
        <h3>Nyay Setu</h3>
        <p>स्याद्य न्यायः सदा वर्धते</p>
      </div>
      <div className="footer-right">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:info@nyaysetu.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>
      </section>
      </div>
    </>
  );
}
