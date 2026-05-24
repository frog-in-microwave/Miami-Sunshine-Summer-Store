import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { changeInfo } from "../../store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateLogin = () => {
    let newErrors = {};

    // Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "EMAIL_REQUIRED";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "INVALID_EMAIL_FORMAT";
    }

    // Password Length Validation (Min 6)
    if (!formData.password) {
      newErrors.password = "PASSWORD_REQUIRED";
    } else if (formData.password.length < 6) {
      newErrors.password = "NO PASSWORD IS LESS THAN 6 CHARACTERS";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        // Handle specific status codes
        if (response.status === 401) {
          setErrors((prev) => ({ ...prev, server: "INCORRECT_PASSWORD" }));
        } else if (response.status === 404) {
          setErrors((prev) => ({ ...prev, server: "EMAIL_NOT_FOUND" }));
        } else {
          setErrors((prev) => ({ ...prev, server: "SERVER_ERROR_TRY_AGAIN" }));
        }

        console.log("error with the response. data : ", data);
        setIsLoading(false);
        return;
      }

      const { message, user, token } = data;

      // ACCESS GRANTED:
      console.log("ACCESS GRANTED:", user);
      dispatch(changeInfo(user));

      // token:
      console.log("token:", token, "type:", typeof token);
      localStorage.setItem("token", token);

      navigate("/account");
    } catch (err) {
      // in catch
      console.log("in catch");
      // error with fetching :
      console.log("error with fetching : ", err);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="login-vibe">
      <div className="login-container">
        <div className="form-sticker brand-font">MEMBER ACCESS</div>

        <header className="login-header">
          <h1 className="brand-font">
            USER <span className="outline-text">LOGIN</span>
          </h1>
          <div className="header-bar">
            <span className="brand-font">AUTH_REQUIRED</span>
            <div className="barcode">|| | ||| | || ||| |</div>
          </div>
        </header>

        <form className="login-form" onSubmit={handleLogin} noValidate>
          {/* Specific Error Display */}
          {errors.server && (
            <div className="error-msg brand-font server-error-vibe">
              {errors.server}
            </div>
          )}

          <div className="input-group-stack">
            <div className={`input-group ${errors.email ? "error-vibe" : ""}`}>
              <label className="brand-font">EMAIL ADDRESS</label>
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
              <label className="brand-font">PASSWORD</label>
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
          </div>

          {isLoading ? (
            <div className="inline-terminal-loader">
              <p className="brand-font pulse">STATUS: AUTHENTICATING_USER...</p>
              <div className="loading-bar-container">
                <div className="loading-bar-fill"></div>
              </div>
              <p className="loader-subtext brand-font">
                ESTABLISHING_SECURE_SESSION
              </p>
            </div>
          ) : (
            <button type="submit" className="login-submit-btn brand-font">
              ENTER TERMINAL
            </button>
          )}
        </form>

        <footer className="form-footer">
          <p className="brand-font">
            NEW SURFER? <Link to="/signup">CREATE ACCOUNT</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
