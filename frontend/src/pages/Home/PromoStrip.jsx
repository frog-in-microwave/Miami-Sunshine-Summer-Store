import React from "react";
import "./Home.css";

const PromoStrip = () => {
  // We repeat the text to ensure a seamless infinite scroll
  const items = [
    "MIAMI SUNSHINE SUMMER DROP",
    "FREE EXPRESS SHIPPING OVER $100",
    "JOIN THE INSIDERS CLUB",
    "NEW SURF GEAR ARRIVING DAILY",
    "STAY GOLDEN",
    "MIAMI SUNSHINE SUMMER DROP",
    "FREE EXPRESS SHIPPING OVER $100",
    "JOIN THE INSIDERS CLUB",
    "NEW SURF GEAR ARRIVING DAILY",
    "STAY GOLDEN",
  ];

  return (
    <div className="promo-strip">
      <div className="promo-track">
        {items.map((text, index) => (
          <span key={index} className="promo-item brand-font">
            {text} <span className="separator">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromoStrip;
