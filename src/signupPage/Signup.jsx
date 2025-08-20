import React, { useState } from 'react';
import './Signup.css';
import {useNavigate, useSearchParams } from 'react-router-dom';
import a from './logo.jpg';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { baseBookURL } from '../axios';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role')
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    console.log(role);
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return
    }
    else{
    const clientData ={
      Name:formData.name,
      Email:formData.email,
      Password:formData.confirmPassword
    }
    try{
      if(role==='client'){
      console.log(clientData);
      
      const {data} = await baseBookURL.post('/clientAccount/addClient',clientData)
      if(data?.Success){
        alert(data?.Message)
      }
      else{
        alert('Failed')
      }
    }
    else if(role==='lawyer'){
      console.log(clientData);
      const {data} = await baseBookURL.post('/lawyerAccount/addLawyer',clientData)
      if(data?.Success){
        alert(data?.Message)
        navigate('/login?role=lawyer')
      }
      else{
        alert('Failed')
      }
    }
    }
    catch(error){
      console.log(error);
      
    }
  }
  };
  function handleLogin(){
    if(role==='client'){
      navigate('/login?role=client')
    }
    else if(role==='lawyer'){
      navigate('/login?role=lawyer')
    }
  }

  return (
    <div className='body1'>
    <div className='Background2'>
    <div className="form-container1">
      <img className="logoimg" src={a} alt="Logo" />
      <form className='signup-form' onSubmit={handleSubmit}>
        <h2>Create Your Account</h2>

        <div className="input-wrapper">
          <FaUser className="input-icon"/>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input
            type="text"
            id="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>

        <p className="login-text">
          Already have an account?{' '}
          <button onClick={handleLogin} className="link-button">Login</button>
        </p>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Signup;
