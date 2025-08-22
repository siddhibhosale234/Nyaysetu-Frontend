import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './NyaysetuLogo.png';
import { FaUserCircle, FaBell } from 'react-icons/fa';

export function NavbarLaw() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbarLaw">
      <div className="titleLogoLaw">
        <img src={logo} alt="Logo" />
        <h1>NYAYSETU</h1>
      </div>

      {/* Navigation list */}
      <div className={`listLaw ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li><a href='/lawyerhome'>Home</a></li>
          <li><a href="/activecases">My Cases</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/contactUs">Contact Us</a></li>
          <li><a href="/services">Our Services</a></li>
        </ul>
      </div>

      {/* Icons */}
      <div className="navbar-iconsLaw">
        <div className="notificationsLaw" onClick={() => { navigate('/reminders?role=lawyer') }}>
          <FaBell size={20} color="#00c9ff" />
        </div>
        <div className="profileLaw" onClick={() => { navigate('/profile') }}>
          <FaUserCircle size={30} color="#00c9ff" />
        </div>
      </div>

      {/* Hamburger toggle */}
      <div
        className={`toggle-btnLaw ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
