import React, { useState } from "react";















const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);


  const addToCart = (product) => {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const productIndex = cartProducts.findIndex(
      (item) => item.id === product.id,
    );
    if (productIndex > -1) {
      cartProducts[productIndex].qty += quantity;
    } else {
      cartProducts.push({ ...product, qty: quantity });
    }
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
     
    // This tells the Navbar to re-run its updateCartCount function
    window.dispatchEvent(new Event("cart-updated"));
  };;



  const salePrice =
    product.salePercentage > 0
      ? (product.price * (1 - product.salePercentage / 100)).toFixed(2)
      : null;

  return (
    <div className="info-container">
      <span className="info-category brand-font">{product.category}</span>
      <h1 className="info-title brand-font">{product.name}</h1>

      <div className="info-price-row">
        {salePrice ? (
          <>
            <span className="current-price brand-font">${salePrice}</span>
            <span className="original-price brand-font">${product.price}</span>
            <span className="info-sale-tag brand-font">
              {product.salePercentage}% OFF
            </span>
          </>
        ) : (
          <span className="current-price brand-font">${product.price}</span>
        )}
      </div>

      <p className="info-description">{product.description}</p>

      <div className="info-actions">
        <div className="quantity-selector">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span className="brand-font">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={() => addToCart(product)}  className="add-to-cart-btn brand-font">
          Add to Manifest // ${salePrice || product.price}
        </button>
      </div>

      <div className="info-meta">
        <div className="meta-item">
          <span className="icon">🚚</span>
          <p className="brand-font">FREE EXPRESS SHIPPING IN THE 305</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
