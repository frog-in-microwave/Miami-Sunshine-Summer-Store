import React from "react";
import "./About.css";

const HeroSection = () => {
  return (
    <section className="about-vibe">
      <div className="about-container">
        <div className="vibe-badge">MIAMI MADE</div>
        <h1 className="brand-font about-title">
          CHASING <br /> LIGHT.
        </h1>
        <div className="about-content">
          <div className="about-photo-stack">
            <img
              src="https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&q=80"
              alt="Surf"
            />
          </div>
          <p className="vibe-text">
            We started in a garage in Essen, but our heart was always in Miami.
            Miami Sunshine isn't just a shop; it's a mood. High heat, cold
            drinks, and gear that actually lasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
