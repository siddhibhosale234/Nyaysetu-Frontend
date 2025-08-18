import React, { useState } from "react";
import "./Navbar1.css";
import logo from "../signupPage/logo.jpg"; // Ensure correct path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar glassy-navbar">
      <div className="navbar-left" onClick={() => scrollToSection("Home")}>
        <img src={logo} alt="Nyay Setu Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">Nyay Setu</span>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a onClick={() => scrollToSection("how-to-use")}>How to Use</a>
        <a onClick={() => scrollToSection("features")}>Features</a>
        <a onClick={() => scrollToSection("testimonials")}>Testimonials</a>
        <a onClick={() => scrollToSection("footer")}>Get Started</a>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
