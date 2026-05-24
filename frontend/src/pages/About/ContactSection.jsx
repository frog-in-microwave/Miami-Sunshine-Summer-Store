import React, { useState } from "react";
import "./About.css";
import sendEmail from "../../fetchingServices/sendEmail.js";

const ContactSection = () => {
  // --- STATE MANAGEMENT ---
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // e.target[0]: Name, [1]: Email, [2]: Message, [3]: HoneyPot
      await sendEmail(
        e.target[0].value,
        e.target[1].value,
        e.target[2].value,
        e.target[3].value,
      );

      // 1. Reset the form inputs
      e.target.reset();

      // 2. Show success state and kill loader
      setIsLoading(false);
      setIsSuccess(true);

      // 3. Return to original look after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("EMAIL_DISPATCH_FAILED:", error);
      setIsLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <span className="brand-font accent-text">Connect</span>
          <h2 className="brand-font">Get in Touch</h2>
          <p>Questions about a drop? Just want to talk surf? We're here.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label className="brand-font">Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                disabled={isLoading || isSuccess}
              />
            </div>
            <div className="input-group">
              <label className="brand-font">Email</label>
              <input
                type="email"
                placeholder="hello@miami.com"
                required
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="brand-font">Message</label>
            <textarea
              placeholder="Tell us everything..."
              rows="5"
              required
              disabled={isLoading || isSuccess}
            ></textarea>
          </div>

          <input type="text" name="honeyPot" style={{ display: "none" }} />

          {/* --- TRIPLE CONDITIONAL: LOADER vs SUCCESS vs BUTTON --- */}
          {isLoading ? (
            <div className="inline-terminal-loader">
              <p className="brand-font pulse">STATUS: DISPATCHING_MESSAGE...</p>
              <div className="loading-bar-container">
                <div className="loading-bar-fill"></div>
              </div>
            </div>
          ) : isSuccess ? (
            <div className="inline-terminal-loader success-vibe">
              <p className="brand-font">STATUS: SENT_SUCCESSFULLY</p>
              <p className="loader-subtext brand-font">THANK_YOU_SURFER</p>
            </div>
          ) : (
            <button type="submit" className="contact-btn brand-font">
              Send Message
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
