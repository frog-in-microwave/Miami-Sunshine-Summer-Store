import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="vibe-footer">
      <div className="footer-top-strip">
        <div className="marquee-content brand-font">
          {/* Two identical spans are required for the seamless handoff */}
          <span>
            KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP
            IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦
          </span>
          <span>
            KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP
            IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦ KEEP IT SUNNY ✦
          </span>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="brand-font">
            MIAMI <br /> SUNSHINE <br /> SUMMER <br /> STORE
          </h2>
          <p className="footer-copy">© 2026 - STAY GOLDEN</p>
        </div>

        <div className="footer-social">
          <div className="social-badge">IG</div>
          <div className="social-badge">TK</div>
          <div className="social-badge">YT</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
