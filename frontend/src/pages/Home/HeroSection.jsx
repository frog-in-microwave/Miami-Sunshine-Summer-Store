import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const HeroSection = () => {
  return (
    <section className="vibe-hero">
      <div className="hero-grid">
        <div className="hero-text-area">
          <div className="vibe-badge">DROP 01 OUT NOW</div>
          <h1 className="brand-font main-title">
            ENERGY <br />
            <span className="outline-text">FOR THE</span> <br />
            SUN-BAKED
          </h1>
          <div className="hero-actions">
            <Link to="/shop" className="cta-button primary brand-font">
              Grab Gear
            </Link>
            <Link to="/about" className="cta-button secondary brand-font">
              Our Vibe
            </Link>
          </div>
        </div>

        <div className="hero-visual-area">
          <div className="main-image-frame">
            <img
              src="https://ik.imagekit.io/frogimages/homeHeroImage?updatedAt=1774043607733"
              alt="Beach Vibe"
            />
          </div>
          <div className="floating-card brand-font">
            EST '26 <br /> MIAMI FL
          </div>
        </div>
      </div>

      {/* Decorative Sun Element */}
      <div className="hero-sun"></div>
    </section>
  );
};

export default HeroSection;
