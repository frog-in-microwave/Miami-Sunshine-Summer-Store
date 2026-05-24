import React, { useState } from "react";
import "./Cart.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Cart = () => {



  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartProducts")) || [],
  );
  


  const navigate = useNavigate();


  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  }, [cartItems]);


  const goToCheckout = () => {
    if(cartItems.length === 0){
      navigate("/shop");
      return;
    }
    if(!isAuthenticated){
      navigate("/login");
      return;
    }
    navigate("/checkout");
    return;
  }






  const updateQty = (id, changeValue) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + changeValue > 0 ? item.qty + changeValue : 1,
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h1 className="brand-font">
            YOUR <span className="outline-text">MANIFEST</span>
          </h1>
          <p className="brand-font">
            {cartItems.length} ITEMS READY FOR DEPARTURE
          </p>
        </header>

        <div className="cart-grid">
          {/* LEFT: ITEM LIST */}
          <section className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div className="item-img-box">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <span className="item-cat brand-font">{item.category}</span>
                    <h3 className="brand-font">{item.name}</h3>
                    <p className="item-price brand-font">${item.price}</p>

                    <div className="item-controls">
                      <div className="qty-stepper">
                        <button onClick={() => updateQty(item.id, -1)}>
                          −
                        </button>
                        <span className="brand-font">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <div className="item-total brand-font">
                    ${item.price * item.qty}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart brand-font">
                MANIFEST IS EMPTY. GO GET SOME GEAR.
              </div>
            )}
          </section>

          {/* RIGHT: SUMMARY STICKER */}
          <aside className="cart-summary">
            <div className="summary-card">
              <h2 className="brand-font">SUMMARY</h2>
              <div className="summary-line">
                <span>SUBTOTAL</span>
                <span>${subtotal}</span>
              </div>
              <div className="summary-line">
                <span>SHIPPING</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="shipping-promo">
                  ADD ${100 - subtotal} MORE FOR FREE SHIPPING
                </p>
              )}
              <div className="summary-total brand-font">
                <span>TOTAL</span>
                <span>${total}</span>
              </div>
              <button onClick={goToCheckout} className="checkout-btn brand-font">
                PROCEED TO CHECKOUT
              </button>
              {/* CLEAR CART BUTTON ADDED HERE */}
              <button onClick={() => setCartItems([])} className="clear-cart-btn brand-font">
                CLEAR MANIFEST
              </button>
              <div className="secure-badge">SSL SECURE PORTAL // MIAMI, FL</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
