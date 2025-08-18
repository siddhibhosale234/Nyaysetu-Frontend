// UserAboutUs.jsx
import React, { useEffect, useState } from "react";
import "./UserAboutUs.css";
import nyayLogo from "./Nyaysetu logo.jpg";
import { FaUsers, FaGavel, FaCheckCircle, FaHandshake, FaUserCircle, FaBell } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";  // ✅ Correct import for Swiper v10+
import { useNavigate } from "react-router-dom";

const teamMembers = [
  { name: "Siddhi Bhosale", role: "Professional Backend Developer, Concept Creator", img: null },
  { name: "Utkarsh Patil", role: "Professional Frontend Developer, Flow Manager", img: null },
  { name: "Tanvi Shrirame", role: "UI and Content Designer, Professional Frontend Developer", img: null },
  { name: "Samruddhi Kale", role: "UI Designer, Creative Designer", img: null },
  { name: "Parmeshwar Digole", role: "Branding and UI Component Designer, Suggested Name NyaySetu", img: null },
  { name: "Pushkar Patil", role: "Team Contributor and Presenter", img: null },
  { name: "Aniruddha Thithe", role: "Team Contributor", img: null },
  { name: "Your 8th Member", role: "Role Description Here", img: null },
];

const testimonials = [
  { name: "Rohit S.", feedback: "NyaySetu made finding a lawyer so easy. Very professional service!", img: "https://i.pravatar.cc/100?img=1" },
  { name: "Anjali K.", feedback: "The chat feature is amazing! I could consult easily without leaving home.", img: "https://i.pravatar.cc/100?img=2" },
  { name: "Vikram P.", feedback: "Quick response from lawyers and very transparent. Highly recommended!", img: "https://i.pravatar.cc/100?img=3" },
  { name: "Sneha M.", feedback: "Creating my profile was simple and helped me find the right legal help fast.", img: "https://i.pravatar.cc/100?img=4" },
  { name: "Amit R.", feedback: "Excellent platform with trustworthy lawyers. Very convenient to use.", img: "https://i.pravatar.cc/100?img=5" },
  { name: "Priya S.", feedback: "I loved how easy it was to track my appointment and communicate securely.", img: "https://i.pravatar.cc/100?img=6" },
  { name: "Karan D.", feedback: "Great support team and very user-friendly interface.", img: "https://i.pravatar.cc/100?img=7" },
  { name: "Neha L.", feedback: "Professional lawyers and smooth experience from start to finish!", img: "https://i.pravatar.cc/100?img=8" },
];


const UserAboutUs = () => {
  const navigate = useNavigate()
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (

    <div className="aboutus-container">
      {/* NAVBAR */}
      <nav className="navbarClientAboutUs">
        <div className="logoClientAboutUs">
          <img src={nyayLogo} alt="NyaySetu Logo" className="nyaysetu-logoClientAboutUs" />
          <span className="logo-textClientAboutUs">NyaySetu</span>
        </div>
        <ul className="nav-linksClientAboutUs">
          <li><a href="/clienthome">Home</a></li>
          <li><a href="/servicescient">Services</a></li>
          <li><a href="/aboutusclient">About</a></li>
          <li onClick={()=>{navigate('/reminders?role=client')}}><FaBell size={20} color="#00c9ff" /></li>
          <li onClick={()=>{navigate('/clientprofile')}}><FaUserCircle size={30} color="#00c9ff" /></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="about-hero glass hero-animated" data-aos="fade-up">
        <h1>About NyaySetu</h1>
        <p>
          NyaySetu is India’s leading online legal hiring platform, connecting clients with trusted lawyers in their city.
          Our mission: <strong>accessible, fast, and transparent legal assistance for everyone.</strong>
        </p>
        <p>
          We connect <strong>500+ verified lawyers</strong> with clients, offering expert guidance in civil, criminal, corporate, property, and family law.
        </p>
        <div className="hero-buttons">
          <button className="cta-btn" onClick={()=>{navigate('/hiringpage')}}>Hire a Lawyer</button>
          <button className="cta-btn cta-secondary" onClick={()=>{navigate('/servicesclient')}}>Our Services</button>
        </div>
        <div className="hero-floating-icons">
          <FaUsers className="floating-icon" />
          <FaGavel className="floating-icon" />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision glass" data-aos="fade-left">
        <div className="cards-container">
          <div className="card">
            <h2>Our Mission</h2>
            <p>To simplify legal appointments, provide reliable guidance, and empower clients with easy access to legal assistance.</p>
          </div>
          <div className="card">
            <h2>Our Vision</h2>
            <p>To be the most trusted online platform for connecting clients with verified lawyers, ensuring justice is within reach.</p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="core-values glass" data-aos="fade-right">
        <h2>Our Core Values</h2>
        <div className="values-container">
          <div className="value-card" data-aos="fade-up" data-aos-delay="100">
            <FaCheckCircle className="value-icon" />
            <h3>Transparency</h3>
            <p>All lawyer profiles are verified with real credentials and reviews.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="200">
            <FaHandshake className="value-icon" />
            <h3>Accessibility</h3>
            <p>Book appointments and chat with lawyers anytime from your device.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="300">
            <FaUsers className="value-icon" />
            <h3>Confidentiality</h3>
            <p>Your personal and case information is fully secure.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="400">
            <FaGavel className="value-icon" />
            <h3>Expertise</h3>
            <p>Our lawyers are professionals across multiple legal domains.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works glass" data-aos="fade-up">
        <h2>How NyaySetu Works</h2>
        <div className="steps-container">
          <div className="step-card" data-aos="fade-up" data-aos-delay="100">
            <h3>Create Profile</h3>
            <p>Complete your client profile with details and documents.</p>
          </div>
          <div className="step-card" data-aos="fade-up" data-aos-delay="200">
            <h3>Search Lawyers</h3>
            <p>Browse verified lawyer profiles by location, specialization, and reviews.</p>
          </div>
          <div className="step-card" data-aos="fade-up" data-aos-delay="300">
            <h3>Request Appointment</h3>
            <p>Schedule appointments with chosen lawyers.</p>
          </div>
          <div className="step-card" data-aos="fade-up" data-aos-delay="400">
            <h3>Chat & Consult</h3>
            <p>Securely discuss your case in detail with your lawyer.</p>
          </div>
          <div className="step-card" data-aos="fade-up" data-aos-delay="500">
            <h3>Track Progress</h3>
            <p>Monitor your cases and lawyer responses online.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-choose-us glass" data-aos="fade-left">
        <h2>Why Choose NyaySetu?</h2>
        <div className="why-cards">
          <div className="why-card" data-aos="fade-up" data-aos-delay="100">
            <p>Verified and professional lawyers only – no fake profiles.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="200">
            <p>Easy search with filters for specialization, location, and experience.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="300">
            <p>Transparent communication and appointment tracking.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="400">
            <p>Dedicated client support for queries and issues.</p>
          </div>
          <div className="why-card" data-aos="fade-up" data-aos-delay="500">
            <p>Free first consultation for many lawyers to get started risk-free.</p>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="statistics glass" data-aos="fade-up">
        <h2>Our Achievements</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Verified Lawyers</p>
          </div>
          <div className="stat-card">
            <h3>1000+</h3>
            <p>Appointments Completed</p>
          </div>
          <div className="stat-card">
            <h3>95%</h3>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team glass" data-aos="zoom-in">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          {teamMembers.map((member, idx) => (
            <div className="team-card" key={idx} data-aos="fade-up" data-aos-delay={idx * 150}>
              {member.img ? <img src={member.img} alt={member.name} /> : <FaUserCircle className="default-profile-icon" />}
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials glass" data-aos="fade-up">
        <h2>Client Testimonials</h2>
        <Swiper
          modules={[Autoplay]}        // ✅ Add Autoplay module here
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000 }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="testimonial-card">
                {t.img ? <img src={t.img} alt={t.name} className="testimonial-avatar" /> : <FaUserCircle className="testimonial-avatar" />}
                <p>"{t.feedback}"</p>
                <h4>- {t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* FOOTER */}
      <footer className="footer glass" data-aos="fade-up">
        <p>© {new Date().getFullYear()} NyaySetu. All Rights Reserved.</p>
        <p>स्याद्य न्यायः सदा वर्धते</p>
      </footer>

      {/* SCROLL TOP BUTTON */}
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
};

export default UserAboutUs;
