import React, { useState } from "react";
import "./LoginForm.css";
import a from './NyaysetuLogo.png';
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseBookURL } from "../axios";

export function Login(){
  const [searchParams] =useSearchParams();
  const role = searchParams.get('role')
  const [showForgot, setShowForgot] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate()
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    if (role === "client") {
      const details = await baseBookURL.get("/clientAccount/getClients");
      const user = details.data.clientDataList.find(
        (val) => val.Email === username && val.Password === password
      );

      if (!user) {
        alert("Username or password incorrect");
        localStorage.setItem('loggedin',false)
        return;
      }

      const details2 = await baseBookURL.get("/clientProfile/getClientProfiles");
      const profile1 = details2.data.clientProfileDataList.find(
        (val2) => val2.Email === username
      );

      if (!profile1) {
        alert("Please create your profile.");
        navigate("/createprofile");
        return;
      }

      alert("Login Successful");
      localStorage.setItem('loggedin',true)
      localStorage.setItem("clientId", profile1._id);
      navigate("/clientHome");
    }

    if (role === "lawyer") {
      const details = await baseBookURL.get("/lawyerAccount/getLawyers");
      const user = details.data.lawyerDataList.find(
        (val) => val.Email === username && val.Password === password
      );

      if (!user) {
        alert("Username or password incorrect");
        localStorage.setItem('loggedin',false)
        return;
      }

      const details1 = await baseBookURL.get("/lawyerProfile/getLawyerProfiles");
      const profile = details1.data.lawyerProfileDataList.find(
        (val1) => val1.Email === username
      );

      if (!profile) {
        alert("Please create your profile.");
        navigate("/lawyer1");
        return;
      }

      alert("Login Successful");
      localStorage.setItem('loggedin',true)
      localStorage.setItem("lawyerProfile", profile._id);
      navigate("/lawyerhome");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred. Please try again.");
  }
};


  const handleForgot = (e) => {
    e.preventDefault();
    
    console.log("Reset password for:", forgotEmail);
  };

  return (
    <div className="login-body">
      <div className="container1">
        {showForgot ? (
          <div id="forgot-form">
            <img src={a} alt="NyaySetu Logo" className="logo-img" />
            <h2 style={{color:"#ffff"}}>Forgot Password</h2>
            <form className="forgot-form" onSubmit={handleForgot}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
              <p>
                <a href="#" onClick={() => setShowForgot(false)} style={{color:"#ffff"}}>
                  Back to Login
                </a>
              </p>
            </form>
          </div>
        ) : (
          <div id="login-form">
            <img src={a} alt="NyaySetu Logo" className="logo-img" />
            <h2 style={{color:"#ffff"}}>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
              <p>
                <a href="#" onClick={() => setShowForgot(true)} style={{color:"#ffff"}}>
                  Forgot Password?
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
