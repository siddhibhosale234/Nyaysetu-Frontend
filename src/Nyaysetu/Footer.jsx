// ===== Footer.jsx =====

import './Footer.css';
import c from './NyaysetuLogo.png'
import { FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="footer1">
      <div className="footer1-content">
        <div className="footer1-section about">
          <img src={c} alt="" style={{height:"35%", width:"15%"}}/>
          <h3>NYAYSETU</h3>
          <p>Empowering access to justice through simplified legal tools and trusted representation.</p>
        </div>

        <div className="footer1-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/lawyerhome">Home</a></li>
            <li><a href="/aboutus">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer1-section contact">
          <h4>Contact</h4>
          <p>Email: info@nyaysetu.com</p>
          <p>Phone: +91 xxxxx xxxxx</p>
          <p>Address: Pune, Maharashtra, India</p>
          <div className="socials">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaXTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer1-bottom">
        <p>&copy; 2025 NYAYSETU. All rights reserved. <a href="#">Terms</a> | <a href="#">Privacy</a></p>
        <a href="#" className="back-to-top">↑ Back to Top</a>
      </div>
    </footer>
  );
}