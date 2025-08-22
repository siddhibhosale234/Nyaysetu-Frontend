// UserHome.jsx
import React, { useState} from "react";
import "./UserHome.css";
import justiceImage from "./styamevajayatey.png"; // Hero image
import nyayLogo from "./Nyaysetu logo.jpg"; // New logo
import { baseBookURL } from "../axios";
import { useNavigate } from "react-router-dom";
import { FaBell , FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
const UserHome = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [msg,setMsg] = useState('')
   const [menuOpen, setMenuOpen] = useState(false);
  const handleRequest = async(e)=>{
    e.preventDefault();
    const requestData = {
      Name:name,
      Email:email,
      Message:msg
    }
    try {
      const {data} = await baseBookURL.post('/contactRequest/addRequest',requestData)
      if(data?.Success){
        alert(data?.Message)
        setName('')
        setEmail('')
        setMsg('')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="userHomeBody">
    <div className="home-container">
      {/* NAVBAR */}
      {/* NAVBAR */}
      <nav className="navbarUserHome">
        <div className="logoUserHome">
          <img src={nyayLogo} alt="NyaySetu Logo" className="nyaysetu-logoUserHome" />
          <span className="logo-textUserHome">NyaySetu</span>
        </div>

        {/* Toggle Button */}
        <div className="menu-toggleUserHome" onClick={()=>setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={25} color="#00c9ff"/> : <FaBars size={25} color="#00c9ff"/>}
        </div>

        {/* Nav Links */}
        <ul className={`nav-linksUserHome ${menuOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={()=>setMenuOpen(false)}>Home</a></li>
          <li><a href="/servicesclient" onClick={()=>setMenuOpen(false)}>Services</a></li>
          <li><a href="#hire" onClick={()=>setMenuOpen(false)}>Hire</a></li>
          <li><a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></li>
          <li><a href="/aboutusclient" onClick={()=>setMenuOpen(false)}>About</a></li>
          <li onClick={()=>{navigate('/reminders?role=client'); setMenuOpen(false)}}><FaBell size={20} color="#00c9ff" /></li>
          <li onClick={()=>{navigate('/clientprofile'); setMenuOpen(false)}}><FaUserCircle size={30} color="#00c9ff" /></li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="heroUserHome" id="home">
        <div className="hero-textUserHome glass">
          <h1>Less Worry,<br />Appoint <span>Easily !!</span></h1>
          <p>Appoint your first lawyer for free.</p>
          <div className="hero-buttonsUserHome">
            <button className="btnUserHome" onClick={()=>{navigate('/hiringPage')}}>Get Started</button>
            <button className="btnUserHome outline">Learn More</button>
          </div>
          <p className="taglineUserHome">Over 500+ Lawyers from Pune</p>
        </div>
        <div className="hero-imageUserHome">
          <img src={justiceImage} alt="Justice" className="justice-imgUserHome" />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="servicesUserHome" id="services">
        <h2>Our Services</h2>
        <div className="service-cardsUserHome">
          <div className="cardUserHome glass">
            <h3>Legal Advice</h3>
            <p>Get expert legal advice from top professionals in your area.</p>
          </div>
          <div className="cardUserHome glass">
            <h3>Case Assistance</h3>
            <p>Guidance at every step, from filing to resolution.</p>
          </div>
          <div className="cardUserHome glass">
            <h3>Document Preparation</h3>
            <p>Prepare affidavits, contracts, and other legal documents easily.</p>
          </div>
        </div>
      </section>

      {/* HIRE SECTION */}
      <section className="hireUserHome" id="hire">
        <h2>Hire a Lawyer</h2>
        <p>Browse through verified profiles and hire the right lawyer for your needs.</p>
        <button className="btnUserHome" onClick={()=>navigate('/hiringPage')}>View Lawyers</button>
      </section>

      {/* CONTACT SECTION */}
      <section className="contactUserHome" id="contact">
        <h2>Contact Us</h2>
        <form className="glass" onSubmit={(e)=>{handleRequest(e)}}>
          <input value={name} type="text" placeholder="Your Name" required onChange={(e)=>{setName(e.target.value)}}/>
          <input value={email} type="email" placeholder="Your Email" required onChange={(e)=>{setEmail(e.target.value)}}/>
          <textarea value={msg} placeholder="Your Message" rows="4" required onChange={(e)=>{setMsg(e.target.value)}}></textarea>
          <button className="btnUserHome" type="submit">Send Message</button>
        </form>
      </section>

      {/* ABOUT SECTION */}
      <section className="aboutUserHome" id="about">
        <h2>About NyaySetu</h2>
        <p>
          NyaySetu is a trusted platform connecting clients with legal experts. 
          We aim to simplify legal appointments and make justice more accessible.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="footerUserHome">
        <p>© {new Date().getFullYear()} NyaySetu. All Rights Reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default UserHome;
