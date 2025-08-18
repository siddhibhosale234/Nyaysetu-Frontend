import a from './NyaysetuLogo.png';
import './LawyerRegistration.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function LawyerRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    DOB: '',
    Email: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.Name || !formData.Age || !formData.DOB || !formData.Email) {
      alert("Please fill in all the details.");
      return
    }
     if (!emailRegex.test(formData.Email)) {
    alert("Please enter a valid email address.");
    return;
  }
    localStorage.setItem("lawyerStep1", JSON.stringify(formData));
    navigate('/lawyer2');
  };

  return (
    <div className="background">
      <div id="login">
        <img src={a} alt="Nyaysetu Logo" id="logo" />
        <h1 id="head">ENTER YOUR DETAILS FOR PROFILE</h1>
        <input
          type="text"
          placeholder="Enter your Full Name"
          required
          id="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your Age"
          required
          min="18"
          id="Age"
          value={formData.Age}
          onChange={handleChange}
        />
        <input
          type="date"
          placeholder="Enter your Date of Birth"
          required
          id="DOB"
          value={formData.DOB}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your Email ID"
          required
          id="Email"
          value={formData.Email}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
}
