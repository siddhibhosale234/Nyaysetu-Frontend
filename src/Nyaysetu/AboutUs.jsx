import './AboutUs.css'
import { NavbarLaw } from './Navbar';
import { Footer } from './Footer';
export function AboutUs() {
  return (
    <>
    <NavbarLaw/>
    <div className='about-body'>
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>

      <section className="about-section about-sectionl slide-in from-left" style={{ animationDelay: "0s" }}>
        <h2>Who We Are</h2>
        <div className="about-content">
          We are a dedicated platform connecting clients with experienced lawyers across diverse legal fields.
        </div>
      </section>

      <div className="about-section about-sectionr slide-in from-right" style={{ animationDelay: "0.3s" }}>
        <h2>Our Mission</h2>
        <div className="about-content">
          To make quality legal help accessible, transparent, and convenient for everyone.
        </div>
      </div>

      <div className="about-section about-sectionl slide-in from-left" style={{ animationDelay: "0.6s" }}>
        <h2>What We Offer</h2>
        <div className="about-content">
          <ul>
            <li>Verified lawyer profiles by specialization</li>
            <li>Case-based client-lawyer matching</li>
            <li>Secure messaging and reminders</li>
            <li>Confidential and secure platform</li>
          </ul>
        </div>
      </div>

      <div className="about-section about-sectionr slide-in from-right" style={{ animationDelay: "0.9s" }}>
        <h2>Why Choose Us?</h2>
        <div className="about-content">
          We combine professionalism, transparency, and user-friendly service to bring you the best legal support possible.
        </div>
      </div>

      <div className="about-section about-sectionl slide-in from-left" style={{ animationDelay: "1.2s" }}>
        <h2>Your Privacy Matters</h2>
        <div className="about-content">
          We protect your data with industry-standard security protocols and strict confidentiality.
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}
