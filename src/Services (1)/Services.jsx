import React from "react";
import "./Services.css";
import logo from "./Nyaysetu logo.jpg";
import criminalLawIcon from "./Assets/criminal-law.png";
import familyLawIcon from "./Assets/family law.jpeg";
import propertyLawIcon from "./Assets/propertylaw.webp";
import corporateLawIcon from "./Assets/corporatelaw.jpeg";
import labourLawIcon from "./Assets/labourlaw.jpeg";
import taxLawIcon from "./Assets/taxlaw.webp";
import "../LandingPage/Footer1.css";
import { useNavigate } from "react-router-dom";
import { FaBell,FaUserCircle } from "react-icons/fa";
const servicesData = [
  {
    title: "Criminal Law",
    icon: criminalLawIcon,
    description:
      "Legal defense and prosecution for criminal offenses, ensuring justice and fair trial.",
    details: [
      "Theft and burglary",
      "Assault and battery",
      "Cybercrime cases",
      "Drug offenses",
      "White collar crimes",
    ],
  },
  {
    title: "Family Law",
    icon: familyLawIcon,
    description:
      "Covers divorce, child custody, adoption, and related family matters.",
    details: [
      "Divorce and separation",
      "Child custody and visitation",
      "Adoption procedures",
      "Domestic violence protection",
      "Alimony and maintenance",
    ],
  },
  {
    title: "Property Law",
    icon: propertyLawIcon,
    description:
      "Deals with property disputes, transfers, and ownership rights.",
    details: [
      "Property disputes and litigation",
      "Title and ownership transfers",
      "Lease agreements",
      "Real estate contracts",
      "Landlord and tenant rights",
    ],
  },
  {
    title: "Corporate Law",
    icon: corporateLawIcon,
    description: "Legal compliance and corporate governance for businesses.",
    details: [
      "Business formation and registration",
      "Corporate governance",
      "Contract drafting and review",
      "Mergers and acquisitions",
      "Regulatory compliance",
    ],
  },
  {
    title: "Labour Law",
    icon: labourLawIcon,
    description: "Protects rights of workers and regulates employment standards.",
    details: [
      "Workplace discrimination",
      "Employee rights and contracts",
      "Wage and hour disputes",
      "Health and safety regulations",
      "Union negotiations",
    ],
  },
  {
    title: "Tax Law",
    icon: taxLawIcon,
    description: "Guidance and dispute resolution in taxation matters.",
    details: [
      "Tax planning and compliance",
      "Audit representation",
      "Dispute resolution",
      "Income and corporate tax",
      "Estate and gift tax",
    ],
  },
];

export default function ServicesClient() {
  const navigate = useNavigate()
  return (
    <>
    <div className="ServicesClientBody">
      {/* Navbar */}
     <nav className="navbarServicesClient">
        <div className="logoServicesClient">
          <img src={logo} alt="NyaySetu Logo" className="nyaysetu-logoServicesClient" />
          <span className="logo-textServicesClient">NyaySetu</span>
        </div>
        <ul className="nav-linksServicesClient">
          <li><a href="/clientHome">Home</a></li>
          <li><a href="/servicesclient">Services</a></li>
          <li><a href="/hiringPage">Hire</a></li>
          <li><a href="/aboutusclient">About</a></li>
          <li onClick={()=>{navigate('/reminders?role=client')}}><FaBell size={20} color="#00c9ff" /></li>
          <li onClick={()=>{navigate('clientprofile')}}><FaUserCircle size={30} color="#00c9ff" /></li>
        </ul>
      </nav>

      {/* Main services grid */}
      <div className="services-sectionServicesClient">
        <h2 className="services-titleServicesClient">Explore Our Legal Expertise</h2>
        <div className="services-gridServicesClient">
          {servicesData.map((service, index) => (
            <div className="service-cardServicesClient" key={index}>
              <div className="card-innerServicesClient">
                <div className="card-frontServicesClient glassy">
                  <img src={service.icon} alt={service.title} />
                  <h3>{service.title}</h3>
                </div>
                <div className="card-backServicesClient glassy">
                  <h3>{service.title} Details</h3>
                  <ul>
                    {service.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-left">
          <h3>Nyay Setu</h3>
          <p>स्याद्य न्यायः सदा वर्धते</p>
        </div>
        <div className="footer-right">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:info@nyaysetu.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </footer>
      </div>
    </>
  );
}
