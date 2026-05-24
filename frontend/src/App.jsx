import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



// Layout Components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

// Page Components
import Signup from "./pages/Signup/index.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Account from "./pages/Account/Account.jsx"; 
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Login from "./pages/Login/index.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";


// Global Styles
import "./App.css";
import { changeInfo } from "./store/slices/userSlice.js";

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    checkIfAuthenticated();
  }, [])
  const checkIfAuthenticated = async () => {
    const token = localStorage.getItem("token") || false;
    if (!token) {
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      console.log("error with the response :(", response.message);
      return;
    }
    const user = await response.json();
    console.log("user is authenticated ! ", user);
    dispatch(changeInfo(user)); 
  }



  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="content-area">
          <Routes>
            {/* The Home Route */}
            <Route path="/" element={<Home />} />

            {/* The About Route */}
            <Route path="/about" element={<About />} />

            {/* THE MISSING PIECE: The Shop Route */}
            <Route path="/shop" element={<Shop />} />

            <Route path="/account" element={<Account />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route path="/checkout" element={<Checkout />} />

            {/* Fallback for 404s */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
