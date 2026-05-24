import React from "react";
import HeroSection from "./HeroSection";
import ContactSection from "./ContactSection";
import "./About.css";
import { useEffect } from "react";

const About = () => {
  
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


  return (
    <div className="about-page">
      <main>
        <HeroSection />

        <section className="vibe-check-section">
          <div className="vibe-container">
            {/* TIGHTER TEXT AREA */}
            <div className="vibe-manifesto">
              <h2 className="brand-font ticker-text">MADE FOR THE HEAT.</h2>
              <p className="heavy-talk">
                We don't do "fast fashion." We do high-voltage gear for the
                people who live between the neon and the salt spray. If it can't
                handle a 3PM Miami downpour and a 3AM rooftop set, it doesn't
                make the cut.
              </p>
              <div className="vibe-sticker">NO FILLER. ALL GOLD.</div>
            </div>

            {/* OVERLAPPING CARDS */}
            <div className="vibe-cards-stack">
              <div className="vibe-mini-card c1">
                <h3>NEON DRIP</h3>
                <p>Colors that glow when the sun goes down.</p>
              </div>
              <div className="vibe-mini-card c2">
                <h3>SALT SOAKED</h3>
                <p>Built for the Atlantic. Tested in the surf.</p>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
    </div>
  );
};

export default About;
