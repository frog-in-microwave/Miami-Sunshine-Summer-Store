import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../store/slices/userSlice";
import "./Signup.css";

// Phone Input Imports
import PhoneInput, {
  isValidPhoneNumber,
  getCountries,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Filter out high-conflict zones (except LB and US)
  const blockedZones = [
    "RU",
    "UA",
    "SY",
    "YE",
    "SD",
    "AF",
    "PS",
    "IL",
    "MM",
    "CD",
  ];
  const allowedCountries = getCountries().filter(
    (country) => !blockedZones.includes(country),
  );

  const availableLabels = [
    { name: "Pro Surfer", color: "var(--sky-blue)" },
    { name: "Beach Bum", color: "#ffcf33" },
    { name: "Wave Chaser", color: "var(--sun-orange)" },
    { name: "Local Legend", color: "#00f2ff" },
    { name: "Party Guy", color: "#ff00ff" },
    { name: "Night Rider", color: "#bb86fc" },
  ];

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    location: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [label, setLabel] = useState(availableLabels[1]);
  const [isLoading, setIsLoading] = useState(false); // Added Loader State

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.userName.trim().length < 5) {
      newErrors.userName = "MIN_5_CHARACTERS_REQUIRED";
    }

    if (formData.password.length < 6) {
      newErrors.password = "WEAK_PASSWORD (MIN_6)";
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = "PHONE_REQUIRED";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "INVALID_DIGITS_FOR_COUNTRY";
    }

    ["email", "location"].forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = "FIELD_REQUIRED";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()){

      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    };

    setIsLoading(true); // Start Loader

    const newUser = {
      ...formData,
      phoneNumber,
      label,
      memberSince: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      orderList: [],
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle 409 Conflict specifically
        if (response.status === 409) {
          setErrors((prev) => ({ ...prev, server: "ACCOUNT_ALREADY_EXISTS" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            server: "REGISTRATION_FAILED_TRY_AGAIN",
          }));
        }
        
      window.scrollTo({ top: 0, behavior: "smooth" });

        console.log("error with the response", data.message);
        setIsLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);
      dispatch(changeInfo(newUser));
      navigate("/account");
    } catch (err) {
      console.log("error :", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-vibe">
      <div className="signup-container">
        <div className="form-sticker brand-font">JOIN THE TRIBE</div>

        <header className="signup-header">
          <h1 className="brand-font">
            CREATE <span className="outline-text">ACCOUNT</span>
          </h1>
          <div className="header-bar">
            <span className="brand-font">EST. 2026</span>
            <div className="barcode">|| | ||| | || ||| |</div>
          </div>
        </header>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {/* Server Error Message */}
          {errors.server && (
            <div className="error-msg brand-font server-error-vibe">
              {errors.server}
            </div>
          )}

          <div className="input-grid">
            <div
              className={`input-group ${errors.userName ? "error-vibe" : ""}`}
            >
              <label className="brand-font">USERNAME (MIN 5)</label>
              <input
                type="text"
                name="userName"
                placeholder="SURFER_01"
                value={formData.userName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.userName && (
                <span className="error-msg brand-font">{errors.userName}</span>
              )}
            </div>

            <div className={`input-group ${errors.email ? "error-vibe" : ""}`}>
              <label className="brand-font">EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="WAVE@MIAMI.COM"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && (
                <span className="error-msg brand-font">{errors.email}</span>
              )}
            </div>

            <div
              className={`input-group ${errors.password ? "error-vibe" : ""}`}
            >
              <label className="brand-font">PASSWORD (MIN 6)</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.password && (
                <span className="error-msg brand-font">{errors.password}</span>
              )}
            </div>

            <div
              className={`input-group ${errors.phoneNumber ? "error-vibe" : ""}`}
            >
              <label className="brand-font">PHONE</label>
              <PhoneInput
                international
                defaultCountry="LB"
                countries={allowedCountries}
                value={phoneNumber}
                onChange={setPhoneNumber}
                disabled={isLoading}
                className="brutalist-phone-input"
              />
              {errors.phoneNumber && (
                <span className="error-msg brand-font">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            <div
              className={`input-group full-width ${errors.location ? "error-vibe" : ""}`}
            >
              <label className="brand-font">LOCATION</label>
              <input
                type="text"
                name="location"
                placeholder="BEIRUT, LB / MIAMI, FL"
                value={formData.location}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.location && (
                <span className="error-msg brand-font">{errors.location}</span>
              )}
            </div>
          </div>

          <div className="label-selector-container">
            <label className="brand-font">CHOOSE YOUR VIBE</label>
            <div className="sticker-sheet">
              {availableLabels.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  disabled={isLoading}
                  className={`sticker-btn brand-font ${label.name === l.name ? "selected" : ""}`}
                  style={{ "--sticker-color": l.color }}
                  onClick={() => setLabel(l)}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="inline-terminal-loader">
              <p className="brand-font pulse">
                STATUS: REGISTERING_NEW_MEMBER...
              </p>
              <div className="loading-bar-container">
                <div className="loading-bar-fill"></div>
              </div>
              <p className="loader-subtext brand-font">
                WRITING_TO_BLOCKCHAIN_DATABASE
              </p>
            </div>
          ) : (
            <button type="submit" className="signup-submit-btn brand-font">
              GET TO SURFING
            </button>
          )}
        </form>

        <footer className="form-footer">
          <p className="brand-font">
            ALREADY A MEMBER? <Link to="/login">LOG IN</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
