import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LandingPage.css";
import "./DirectionsSection.css";
import "./KeyFeatures.css";
import "./Testimonials.css";
import "./Footer1.css";
import "./Navbar1.css";
import Navbar1 from './Navbar1'
import a from "./styamevajayatey.png";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1,
    title: "Register",
    desc: "Start by creating your account on Nyay Setu. This will give you access to personalized legal services and your own dashboard."
  },
  {
    number: 2,
    title: "Upload Documents",
    desc: "Easily upload your legal documents through our secure system. All your files are encrypted and stored safely."
  },
  {
    number: 3,
    title: "Get Matched",
    desc: "Our system analyzes your case and suggests you the most suitable legal expert for your issue."
  },
  {
    number: 4,
    title: "Track Progress",
    desc: "Receive real-time updates and stay informed about every development in your case through your dashboard."
  }
];

const keyFeatures = [
  "Realtime Case Updates",
  "Verified Lawyers Only",
  "Secure Document Uploads",
  "User-Friendly Dashboard",
];

const testimonials = [
  {
    quote: "Nyay Setu helped me get legal help within minutes. Amazing platform!",
    author: "Rahul Patil"
  },
  {
    quote: "Secure and trustworthy. Felt safe uploading my documents here.",
    author: "Sana Shaikh"
  },
  {
    quote: "The lawyer I was matched with was very professional and helpful.",
    author: "Vikram Mehta"
  }
];

const LandingPage = () => {
  const container = useRef(null);
  const nyayRef = useRef(null);
  const setuRef = useRef(null);
  const emblem = useRef(null);
  const sanskrit = useRef(null);
  const sectionRef = useRef(null);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(nyayRef.current, {
      y: -50,
      opacity: 0,
      duration: 1.2,
    })
      .from(
        setuRef.current,
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )
      .from(
        emblem.current,
        {
          scale: 0.6,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.8"
      )
      .from(
        sanskrit.current,
        {
          opacity: 0,
          y: 20,
          duration: 1,
        },
        "-=0.6"
      );

    // Animate Case Cards on scroll
    gsap.from(".case-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".case-studies-section",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, container);

  return () => ctx.revert();
}, []);


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: i * 0.2,
          ease: "power3.out"
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{width:"100vw"}}>
     
      <Navbar1 />

      {/* Hero Section*/}
      <div className="header-container" ref={container} id="Home">
        <div className="header-content">
          <h1 className="logo-text">
            <span className="logo-bold" ref={nyayRef}>NYAY</span>
            <span className="logo-light" ref={setuRef}>SETU</span>
          </h1>
          <img
            src={a}
            alt="Ashoka Emblem"
            className="ashoka"
            ref={emblem}
          />
          <h2 className="sanskrit-text" ref={sanskrit}>
            स्याद्य न्यायः सदा वर्धते
          </h2>
          <p className="tagline">
            May justice flourish forever, starting today.
          </p>
        </div>
      </div>

      {/* Directions Section */}
      <div className="directions-container" ref={sectionRef} id="how-to-use">
        <h2 className="directions-title">How to Use Nyay Setu</h2>
        <div className="vertical-timeline">
          {steps.map((step, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-content">
                <div className="timeline-desc">
                  <div className="desc-number">{step.number}</div>
                  <div className="desc-line" />
                  <div className="desc-text">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                <div className="step-card-vertical">
                  <div className="step-number">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

   

      {/* Key Features Section */}
      <div className="features-section" id="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          {keyFeatures.map((feature, index) => (
            <div className="feature-card" key={index}>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section" id="footer">
        <h2>Ready to Begin?</h2>
        <p>Start your legal journey with confidence. Join Nyay Setu today.</p>
        <button className="cta-button" onClick={()=>{navigate('/disclaimer')}}>Get Started
          <span className="arrow"></span>
        </button>
      </div>

      {/* Testimonials Carousel Section */}
      <div className="testimonials-section" id="testimonials">
        <h2>What People Say</h2>
        <div className="testimonial-carousel">
          <div
            className="testimonial-slide"
            style={{
              transform: `translateX(-${currentTestimonial * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                “{testimonial.quote}”
                <span>- {testimonial.author}</span>
              </div>
            ))}
          </div>
          <div className="carousel-controls">
            <button
              onClick={() =>
                setCurrentTestimonial(
                  currentTestimonial === 0
                    ? testimonials.length - 1
                    : currentTestimonial - 1
                )
              }
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrentTestimonial(
                  currentTestimonial === testimonials.length - 1
                    ? 0
                    : currentTestimonial + 1
                )
              }
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="case-studies-section" id="case-studies">
  <h2 className="section-title">User Success Stories</h2>
  <div className="case-cards">
    <div className="case-card">
      <h3>Case 1: Property Dispute Resolved</h3>
      <p>
        Ramesh, a farmer from Maharashtra, struggled for years with a land boundary issue. Using Nyay Setu, he connected with the right legal advisor and resolved the case within 3 months.
      </p>
    </div>
    <div className="case-card">
      <h3>Case 2: Wrongful Termination</h3>
      <p>
        Priya was terminated from her job unfairly. Through Nyay Setu, she filed a legal complaint and received justice with full compensation and reinstatement.
      </p>
    </div>
    <div className="case-card">
      <h3>Case 3: Pension Clearance</h3>
      <p>
        An elderly citizen used Nyay Setu to clear long-pending pension benefits. With guided steps and legal aid, he received his dues in record time.
      </p>
    </div>
  </div>
</div>

      <footer className="main-footer">
  <div className="footer-left">
    <h3>Nyay Setu</h3>
    <p>स्याद्य न्यायः सदा वर्धते</p>
  </div>
  <div className="footer-right">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="mailto:info@nyaysetu.com">
      <i className="fas fa-envelope"></i>
    </a>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;