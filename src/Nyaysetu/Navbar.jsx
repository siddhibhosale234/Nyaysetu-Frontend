import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './NyaysetuLogo.png';
import { FaUserCircle, FaBell } from 'react-icons/fa';

export function NavbarLaw() {
  const navigate = useNavigate();
  return (
    <nav className="navbarLaw">
      <div className="titleLogoLaw">
        <img src={logo} alt="Logo" />
        <h1>NYAYSETU</h1>
      </div>

      <div className="listLaw">
        <ul>
          <li><a href='/lawyerhome'>Home</a></li>
          <li><a href="/activecases">My Cases</a></li>
          <li><a href="/aboutus">About Us</a></li>
          <li><a href="/contactUs">Contact Us</a></li>
          <li><a href="/services">Our Services</a></li>
        </ul>
      </div>

      <div className="navbar-iconsLaw">
        <div className="notificationsLaw" onClick={()=>{navigate('/reminders?role=lawyer')}}>
          <FaBell size={20} color="#00c9ff" />
        </div>
        <div className="profileLaw" onClick={()=>{navigate('/profile')}}>
          <FaUserCircle size={30} color="#00c9ff" />
        </div>
      </div>
      <div class="toggle-btnLaw" onclick="document.querySelector('.listLaw').classList.toggle('active'); this.classList.toggle('active');">
  <span></span>
  <span></span>
  <span></span>
</div>

    </nav>
  );
}
