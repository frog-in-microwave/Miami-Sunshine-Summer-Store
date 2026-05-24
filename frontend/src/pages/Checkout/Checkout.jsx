import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import handleCardPayment from "../../fetchingServices/handleCardPayment.js";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: user?.userName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    location: user?.location || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cartItems.length === 0) {
      navigate("/shop");
    }
  }, [cartItems.length, navigate]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="checkout-vibe">
      <div className="checkout-container">
        <header className="checkout-header">
          <h1 className="brand-font">
            CHECKOUT <span className="outline-text">TERMINAL</span>
          </h1>
          <div className="header-meta">
            <span className="brand-font">
              VERIFIED_MEMBER: {user?.label?.name || "SURFER_01"}
            </span>
            <div className="barcode">|| | ||| | || ||| | ||</div>
          </div>
        </header>

        <div className="checkout-grid">
          <section className="checkout-form-section">
            <div className="form-block">
              <h2 className="brand-font section-title">01_IDENTIFICATION</h2>
              <div className="input-group">
                <label className="brand-font">FULL_NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  placeholder="ENTER NAME"
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label className="brand-font">EMAIL_ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="ENTER EMAIL"
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
                <div className="input-group">
                  <label className="brand-font">PHONE_NUMBER</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    placeholder="ENTER PHONE"
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            <div className="form-block">
              <h2 className="brand-font section-title">02_DESTINATION</h2>
              <div className="input-group">
                <label className="brand-font">SHIPPING_LOCATION</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="NO LOCATION ON FILE"
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-block">
              <h2 className="brand-font section-title">03_PAYMENT_METHOD</h2>
              {loading ? (
                <div className="inline-terminal-loader">
                  <p className="brand-font pulse">
                    STATUS: PROCESSING_TRANSACTION...
                  </p>
                  <div className="loading-bar-container">
                    <div className="loading-bar-fill"></div>
                  </div>
                  <p className="loader-subtext brand-font">
                    SECURE_ENCRYPTION_ACTIVE
                  </p>
                </div>
              ) : (
                <div className="payment-options">
                  <button
                    onClick={() => handleCardPayment(cartItems, setLoading)}
                    className="pay-btn card-btn brand-font"
                  >
                    PAY_WITH_CARD
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="checkout-summary">
            <div className="summary-sticker brand-font">FINAL_CHECK</div>
            <div className="summary-inner">
              <h2 className="brand-font">ORDER_REVIEW</h2>
              <div className="checkout-item-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-mini-item">
                    <span>
                      {item.qty}X {item.name}
                    </span>
                    <span>${item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="summary-totals">
                <div className="total-line">
                  <span>SUBTOTAL</span>
                  <span>${subtotal}</span>
                </div>
                <div className="total-line">
                  <span>SHIPPING</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <div className="total-final brand-font">
                  <span>TOTAL</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
