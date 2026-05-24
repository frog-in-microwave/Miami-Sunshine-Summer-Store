import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Pulling authentication status from Redux
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // Logic to sync with Local Storage
  useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem("cartProducts");
      if (cartData) {
        const products = JSON.parse(cartData);
        setCartCount(products.length);
      } else {
        setCartCount(0);
      }
    };

    // 1. Check count when Navbar first loads
    updateCartCount();

    // 2. Listen for changes in other tabs (native storage event)
    window.addEventListener("storage", updateCartCount);

    // 3. Listen for a custom event we'll trigger when adding items
    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo brand-font" onClick={closeMenu}>
          Miami Sunshine
        </Link>

        <div
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`nav-links brand-font ${isOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={closeMenu}>
            Shop
          </Link>
          <Link to="/about" onClick={closeMenu}>
            Story
          </Link>

          {isAuthenticated ? (
            <Link to="/account" onClick={closeMenu}>
              ME!
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                Signup
              </Link>
            </>
          )}

          <Link to="/cart" className="cart-link" onClick={closeMenu}>
            Bag [{cartCount}]
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
